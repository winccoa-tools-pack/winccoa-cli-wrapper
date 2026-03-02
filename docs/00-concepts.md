# WinCC OA Concepts for AI Assistants

## What is WinCC OA?

WinCC OA (formerly PVSS II) is a SCADA system by Siemens/ETM. It manages industrial automation data using:
- **Datapoints (DP)**: Named data objects (like variables) — e.g., `Pump1.Status`
- **Datapoint Elements (DPE)**: Attributes of a DP — e.g., `Pump1.Status:_online.._value`
- **Datapoint Types (DPT)**: Templates defining the structure of DPs
- **Configs**: Metadata attached to DPEs (alerts, archives, drivers, etc.)

## Manager Architecture

WinCC OA runs as a set of cooperating **managers** (processes). Every manager must identify its project via `-proj` or `-config`.

```
WCCILpmon          ← Process Monitor (parent)
├── WCCILdata      ← Data Manager (MUST start first — holds the database)
├── WCCILevent     ← Event Manager (routing, alerts, scripts)
├── WCCOActrl      ← CTRL Script Manager
├── WCCOAascii     ← ASCII Import/Export Manager
├── WCCOAopcua     ← OPC UA Driver
├── WCCOAarchiv    ← Archive Manager (Raima)
├── WCCOAnextgenarch ← Next Generation Archive (InfluxDB/PostgreSQL)
└── WCCOAui        ← UI Manager (graphical panels)
```

### Manager Numbers

Each running manager instance has a unique **manager number** (`-num N`). The same manager executable can run multiple instances with different numbers. Default is 1.

## Project Structure

```
<proj_root>/
├── config/
│   └── config       ← Main config file (INI format; needed for -config flag)
├── db/              ← Raima database files
├── log/             ← Log files (PVSS_II.log, WCCOAascii1.log, etc.)
├── scripts/         ← CTRL script files (.ctl)
├── panels/          ← UI panel files
├── data/            ← ASCII import/export files
└── dplist/          ← Datapoint list files
```

## Config File Format

The `config/config` file is INI-style:

```ini
[general]
proj_path = "D:\projects\MyProject"

[pmon]
port = 4999        # Process Monitor TCP port

[data]
port = 4897        # Data Manager port

[event]
port = 4998        # Event Manager port
```

## Project Registry

Registered projects are stored in:
- **Windows**: `C:\ProgramData\Siemens\WinCC_OA\pvssInst.conf`
- **Linux**: `/etc/opt/WinCC_OA/pvssInst.conf`

This file maps project names → config file paths. The `-proj <name>` flag looks up names in this registry.

## Datapoint Naming

```
[system::]dpName[.element][:config[.detail[.attr]]]

Examples:
  Pump1.Speed                    ← DP element (online value implied)
  Pump1.Speed:_online.._value    ← explicit online value attribute
  Pump1.Speed:_archive.._type    ← archive config type attribute
  System1:Pump1.Speed            ← cross-system reference
```

## Database Backends

| Backend | Tool suffix | Description |
|---------|------------|-------------|
| Raima (legacy) | (no suffix) | WCCOAtoolCreateDb, WCCILdata |
| SQLite | `SQLite` | WCCOAtoolCreateDbSQLite, WCCILdataSQLite |
| NGA / InfluxDB | `nextgenarch` | WCCOAnextgenarch |
| NGA / PostgreSQL | `nextgenarch` | WCCOAnextgenarch |

## Exit Codes

Most WinCC OA tools return:
- `0` — success
- `1` — error (missing project, wrong args, etc.)
- `3` — pmon is stopped (for `-status`)
- `4` — pmon status unknown
