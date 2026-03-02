# WinCC OA CLI Guide for AI Assistants

> **Purpose**: This guide teaches AI assistants how to use the WinCC OA 3.21 command-line tools.
> **Installation path**: `C:\Program Files\Siemens\WinCC_OA\3.21\bin\`
> **Version tested**: WinCC OA 3.21

---

## Quick Start

Before running any WinCC OA manager or tool, you must identify the project:

```
# Option 1: by registered project name
WCCOAascii -proj MyProject ...

# Option 2: by config file path
WCCOAascii -config D:\projects\MyProject\config\config ...

# Option 3: via environment variable (set PVSS_II_PROJ=MyProject)
```

All managers output errors to `<proj_path>/log/` and all support `-help` and `-version`.

---

## Tool Index

| Category | File | Tools Covered |
|----------|------|---------------|
| **Concepts** | [00-concepts.md](00-concepts.md) | Architecture, managers, datapoints |
| **Project Setup** | [01-project-setup.md](01-project-setup.md) | Config files, env vars, project registry |
| **Common Flags** | [02-common-flags.md](02-common-flags.md) | Flags shared by all managers |
| **Process Monitor** | [03-pmon.md](03-pmon.md) | `WCCILpmon` — start/stop/control all managers |
| **ASCII Manager** | [04-ascii-manager.md](04-ascii-manager.md) | `WCCOAascii` — import/export/get/set datapoints |
| **CTRL Manager** | [05-ctrl-manager.md](05-ctrl-manager.md) | `WCCOActrl`, `ctrl.exe` — run CTRL scripts |
| **Core Managers** | [06-core-managers.md](06-core-managers.md) | `WCCILdata`, `WCCILevent`, `WCCILdist`, `WCCILredu` |
| **Driver Managers** | [07-driver-managers.md](07-driver-managers.md) | OPC UA, OPC DA, BACnet, Modbus, S7, SNMP, IEC, DNP3 |
| **Archive Managers** | [08-archive-managers.md](08-archive-managers.md) | `WCCOAnextgenarch`, `WCCOAvalarch` |
| **DB Creation Tools** | [09-db-tools.md](09-db-tools.md) | `WCCOAtoolCreateDb`, `WCCOAtoolConvertDb`, `WCCOAtoolSyncTypes` |
| **DB Maintenance** | [10-db-maintenance.md](10-db-maintenance.md) | `WCCOAtoolRepairDb`, `WCCOAtoolRevise`, `WCCOAtoolBuildIdList` |
| **Language Tools** | [11-language-tools.md](11-language-tools.md) | `WCCOAtoolLang`, `WCCOAtoolParse`, `WCCOAtoolTrans` |
| **Raima DB Tools** | [12-raima-tools.md](12-raima-tools.md) | `datdump`, `dbexp`, `dbimp`, `dbcheck`, `dbrev`, etc. |
| **Utility Tools** | [13-utility-tools.md](13-utility-tools.md) | `WCCOAtoolCryptCtrl`, `WCCOAtoolLogViewer`, `WCCOAtoolMedia`, `wida` |
| **License Tools** | [14-license-tools.md](14-license-tools.md) | `WCCOAtoolCMactivation`, `WCCOAtoolGetCMLicInfo`, `WCCILtoolGetHW` |
| **InfluxDB Tools** | [15-influxdb-tools.md](15-influxdb-tools.md) | `influx`, `influxd`, `influx_inspect` (NGA backend) |
| **Shell Scripts** | [16-shell-scripts.md](16-shell-scripts.md) | `stop_wccoa.bat`, `startConsole.cmd`, `startPA.cmd`, `killdbg.cmd` |
| **Cookbook** | [cookbook.md](cookbook.md) | Task-based examples for common AI tasks |

---

## Key Principles for AI

1. **Project context is mandatory**: Every manager needs `-proj <name>` or `-config <path>`. Without it the tool exits with error code 1.
2. **Data manager starts first**: When starting managers manually, `WCCILdata` must start before `WCCILevent`, then other managers.
3. **`WCCILpmon -command` is the control plane**: Use it to start/stop/query individual managers without opening a GUI.
4. **`WCCOAascii` is the data workhorse**: Bulk export, import, single-point get/set — all via `WCCOAascii`.
5. **`WCCOActrl` runs CTRL scripts**: Any automation logic in WinCC OA's own scripting language runs here.
6. **Log output**: By default managers log to `<proj_path>/log/`. Add `-log +stderr` to see output in terminal.
