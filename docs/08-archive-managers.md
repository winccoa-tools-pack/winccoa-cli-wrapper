# Archive Managers

Archive managers store historical data. WinCC OA supports multiple archive backends.

## WCCOAnextgenarch — Next Generation Archive (NGA)

The modern archive manager for **InfluxDB** and **PostgreSQL** backends.

### Usage

```
WCCOAnextgenarch -proj <name> -num <N> -log +stderr
```

No additional CLI flags beyond [common flags](02-common-flags.md). Configuration is done via the project database (NGA configuration DPs).

### Example

```
WCCOAnextgenarch -proj MyProject -num 1 -log +stderr
```

---

## WCCOAvalarch — Value Archive

Raima-based value archive manager (legacy, pre-NGA).

### Usage

```
WCCOAvalarch -proj <name> -num <N> -log +stderr
```

### Example

```
WCCOAvalarch -proj MyProject -num 1 -log +stderr
```

---

## WCCOAarchiv — Archive Manager (Classic)

The classic archive manager for the Raima-based HDB (Historical DataBase). Only present in some versions.

### Usage

```
WCCOAarchiv -proj <name> -num <N> -log +stderr
```

---

## WCCOAreporting — Reporting Manager

Generates reports from archived data.

### Usage

```
WCCOAreporting -proj <name> -num <N> -log +stderr
```

---

## NGAinfluxBackend / NGAMSSQLServerBackend / NGAPostgreSQLBackend

Backend service processes for NGA. Typically started automatically by `WCCOAnextgenarch`.

| Executable | Backend |
|-----------|---------|
| `NGAinfluxBackend.exe` | InfluxDB |
| `NGAMSSQLServerBackend.exe` | Microsoft SQL Server |
| `NGAPostgreSQLBackend.exe` | PostgreSQL |

---

## Initializing NGA for a New Project

When creating a new project with NGA support, use `WCCOAtoolCreateDb` with the `-useNGA` flag:

```
WCCOAtoolCreateDb -proj MyProject -useNGA postgresql -log +stderr
WCCOAtoolCreateDb -proj MyProject -useNGA influxdb -log +stderr
```

---

## NGA Data Import Tool

```
WCCOAtoolNGAImporter -name <ngaManagerAddress> -logPath <logDir> [options]
```

| Flag | Description |
|------|-------------|
| `-name <name>` | Address of the NGA manager (mandatory) |
| `-logPath <dir>` | Directory for log output (mandatory) |
| `-address ip:port[,ip:port]` | NGA manager address(es) |
| `-certificatePath <path>` | ZMQ client certificate file |
| `-plugin <raima\|hdb>` | Source plugin type |
| `-startTime DD.MM.YYYY:HH:MM` | Import start time |
| `-endTime DD.MM.YYYY:HH:MM` | Import end time |
| `-hdbDataPath <path>` | Path to HDB data files |
| `-raimaDataPath <path>` | Path to Raima data files |
| `-maxRateOfSendData <N>` | Max archives sent per second |
| `-sizeOfPackages <N>` | Number of archives per message |
| `-loggerLevel info\|debug` | Log verbosity |

### Example: Migrate HDB to NGA

```
WCCOAtoolNGAImporter \
  -name NGA1 \
  -logPath D:\logs \
  -plugin hdb \
  -hdbDataPath D:\projects\MyProject\db \
  -startTime 01.01.2024:00:00 \
  -endTime 31.12.2024:23:59
```

---

## Archive Repair Tool

See [10-db-maintenance.md](10-db-maintenance.md) for `WCCOAtoolRepairDb` which repairs archive filesets.
