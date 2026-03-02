# Database Creation & Conversion Tools

These tools create, update, and convert WinCC OA project databases. They are used during project setup and migration.

---

## WCCOAtoolCreateDb — Create Project Database (Raima)

Creates a new Raima-based project database. Run this **once** when setting up a new project.

### Usage

```
WCCOAtoolCreateDb -proj <name> [options]
```

Note: This tool requires the project to be registered (in `pvssInst.conf`) before running.

### Flags

| Flag | Description |
|------|-------------|
| `-help` | Print help |
| `-empty` | Do not load internal datapoints (creates bare database) |
| `-workspace` | Create database from workspace |
| `-update` | Update existing database with config/element names and internal DPs (does not remove old data) |
| `-lang <langname>` | Create/update with this language (can specify multiple: `-lang de_AT.iso88591 -lang posix`) |
| `-restore` | Restore config file after create/update (use with `-lang`; not recommended) |
| `-useNGA [postgresql\|influxdb\|none]` | Initialize NGA archive config for the given backend (default: postgresql) |
| `-system <sysnum> <name> [name...]` | Create database with a specific system number and name |
| `-sim n[,n...]` | Number of simulator managers to configure (default: 2); e.g., `-sim 1,5-8,15` |
| `-yes` | Create without confirmation prompt |
| `-apar <args>` | Additional arguments for ASCII Manager |
| `-spar <args>` | Additional arguments for Simulator |
| `-epar <args>` | Additional arguments for Event Manager |
| `-dpar <args>` | Additional arguments for Data Manager (e.g., `-dpar -rcv -dpar 2`) |
| `-importAscii <listfile>` | Additionally import ASCII files listed in this file |

### Examples

```
# Create a new project database
WCCOAtoolCreateDb -proj MyProject -yes -log +stderr

# Create with German language
WCCOAtoolCreateDb -proj MyProject -yes -lang de_AT.iso88591 -log +stderr

# Create with NGA/InfluxDB support
WCCOAtoolCreateDb -proj MyProject -yes -useNGA influxdb -log +stderr

# Update existing database (add new internal DPs from newer WinCC OA version)
WCCOAtoolCreateDb -proj MyProject -update -yes -log +stderr
```

---

## WCCOAtoolCreateDbSQLite — Create SQLite Database

Same flags as `WCCOAtoolCreateDb` but creates a SQLite-based database instead of Raima.

```
WCCOAtoolCreateDbSQLite -proj MyProject -yes -log +stderr
```

---

## WCCOAtoolConvertDb — Convert Raima Database

Converts or upgrades a Raima database (e.g., from one WinCC OA version to another).

### Usage

```
WCCOAtoolConvertDb -proj <name> [options]
WCCOAtoolConvertDb -config <configfile> [options]
```

Requires project context (PVSS_II env var or -proj/-config flags).

---

## WCCOAtoolConvertDbSQLite — Convert SQLite Database

Same purpose as `WCCOAtoolConvertDb` but for SQLite databases.

---

## WCCOAtoolSyncTypes — Synchronize DP Types (Raima)

Synchronizes datapoint type definitions between a source database and the project database. Useful after importing types from another system.

### Usage

```
WCCOAtoolSyncTypes -proj <name> [-source <dbpath>] [-system <sysnum> [<sysname>]]
```

### Extra Flags

| Flag | Description |
|------|-------------|
| `-source <path>` | Source database path to sync from |
| `-system <sysnum> [<sysname>]` | Change system number (and optionally name) of the database |

### Example

```
WCCOAtoolSyncTypes -proj MyProject -source D:\backup\db -log +stderr
```

---

## WCCOAtoolSyncTypesSQLite — Synchronize DP Types (SQLite)

Same as `WCCOAtoolSyncTypes` but for SQLite databases.

---

## WCCOAtoolBuildIdList — Build ID List

Builds the ID list in the archive data set. Used for archive maintenance.

### Usage

```
WCCOAtoolBuildIdList -proj <name> [options]
```

### Flags

| Flag | Description |
|------|-------------|
| `-alert` | Build ID list in alert data set |
| `-timediff <minutes>` | Time step in ID list in minutes |
| `-minid <N>` | Minimum number of IDs in ID list record |
| `-dataset <pathname>` | Name of dataset in DB (for alerts without 'al', e.g., `863456789`) |
| `-multiuser` | Start in multi-user mode |
| `-translog` | Enable transaction logging |

### Example

```
WCCOAtoolBuildIdList -proj MyProject -log +stderr
```

---

## WCCOAtoolNameToId — Translate DP Names to IDs

Translates datapoint names to internal numeric IDs (or vice versa). Useful for low-level database debugging.

### Usage

```
# By DP type name:
WCCOAtoolNameToId -proj <name> -t <DpTypeName>

# By DP type ID:
WCCOAtoolNameToId -proj <name> -t <DpTypeId>

# By DP path:
WCCOAtoolNameToId -proj <name> rootName[.nodeName...][:configName[.detail[.attr]]]

# By numeric ID:
WCCOAtoolNameToId -proj <name> sysId.dpId[.elId[.detailNo[.attrNo]]]

# By pattern:
WCCOAtoolNameToId -proj <name> <pattern>

# Print system info:
WCCOAtoolNameToId -proj <name> -printSystem
WCCOAtoolNameToId -proj <name> -printSystemToFile
```

### Examples

```
WCCOAtoolNameToId -proj MyProject -t _ExampleDP_Int
WCCOAtoolNameToId -proj MyProject Pump1.Speed
WCCOAtoolNameToId -proj MyProject 1.44
WCCOAtoolNameToId -proj MyProject _Data*
```

---

## WCCOAtoolNameToIdSQLite — Same for SQLite

Same as `WCCOAtoolNameToId` but for SQLite databases.

---

## WCCOAtoolSysNames — Manage System Names

Updates system name definitions in the database from a text file.

### Usage

```
# New format:
WCCOAtoolSysNames -proj <name> [-o=<outfile>] [-y] [-s=<sysfile>]

# Old format:
WCCOAtoolSysNames <systemNr> <Name1> [Name2 ...]
```

### Flags

| Flag | Description |
|------|-------------|
| `-h` | Print help |
| `-o=<outfile>` | Write output to file |
| `-y` | No confirmation prompt |
| `-s=<sysfile>` | Input system names file (default: `tesystem.txt`) |

---

## WCCOAtoolSysNamesSQLite — Same for SQLite

Same as `WCCOAtoolSysNames` but for SQLite databases.
