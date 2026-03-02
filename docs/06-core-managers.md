# Core Managers

These are the infrastructure managers that must run for a WinCC OA project to operate. All share the [common flags](02-common-flags.md) and must be started in order.

## Startup Order

```
1. WCCILdata   (MUST be first — holds the database)
2. WCCILevent  (second — routes all messages)
3. All others  (CTRL, ASCII, drivers, UI, etc.)
```

---

## WCCILdata — Data Manager

Manages the project **database** (Raima or SQLite). All datapoints, types, configs, and historical values are stored here.

### Extra Flags

| Flag | Description |
|------|-------------|
| `-repair on\|off\|ignore\|last\|lastonly\|only:<dbpath>\|alerts` | Database repair mode on startup |
| `-check` | Perform Raima DB diagnosis at startup and before each online backup |
| `-forceDBModes` | Force multiuser and transaction logging to values from config file |

### -repair Modes

| Mode | Description |
|------|-------------|
| `on` | Check & repair if `dbase.status` file exists |
| `off` | Exit if `dbase.status` exists (no repair) |
| `ignore` | Remove `dbase.status` without checking |
| `last` | Check & repair last modified datasets if `dbase.status` exists |
| `lastonly` | Check & repair last modified datasets and exit |
| `only:<dbpath>` | Repair only the given path relative to `db/` (e.g., `only:lastval`) |
| `alerts` | Repair "no gone alert between two came ones" problem |

### Examples

```
# Start Data Manager
WCCILdata -proj MyProject -log +stderr

# Start with automatic DB repair on dirty shutdown
WCCILdata -proj MyProject -repair on -log +stderr

# Start and run DB integrity check
WCCILdata -proj MyProject -check -log +stderr
```

---

## WCCILevent — Event Manager

Routes all messages between managers. Handles alerts, scripted events, and inter-manager communication.

### Extra Flags

| Flag | Description |
|------|-------------|
| `-noDMAlertConn` | No automatic alert connection of Data Manager |

### Example

```
WCCILevent -proj MyProject -log +stderr
```

---

## WCCILdist — Distribution Manager

Manages **distributed systems** — connects multiple WinCC OA installations across the network.

No additional flags beyond [common flags](02-common-flags.md).

### Example

```
WCCILdist -proj MyProject -event remotehost:4998 -log +stderr
```

---

## WCCILredu — Redundancy Manager

Manages **hot standby redundancy** between two WinCC OA servers. Synchronizes data and handles failover.

No additional flags beyond [common flags](02-common-flags.md).

### Example

```
WCCILredu -proj MyProject -num 1 -log +stderr
```

---

## WCCILsim — Simulator

Simulates driver data without a real physical connection. Useful for testing and development.

### Example

```
WCCILsim -proj MyProject -num 1 -log +stderr
```

---

## WCCILsplit — Split Manager

Handles split redundancy configurations (2×2 redundancy).

### Example

```
WCCILsplit -proj MyProject -log +stderr
```

---

## WCCILproxy — Proxy Manager

Provides proxy services for distributed WinCC OA systems.

### Example

```
WCCILproxy -proj MyProject -log +stderr
```

---

## WCCILdatabg — Data Background Manager

Background Data Manager variant for SQLite-based projects.

---

## WCCILdataSQLite — SQLite Data Manager

Data Manager variant that uses SQLite instead of Raima.

### Example

```
WCCILdataSQLite -proj MyProject -log +stderr
```

---

## Notes for All Core Managers

- Never start `WCCILevent` before `WCCILdata` — events need the database to be ready
- Each manager instance needs a unique `-num` value per type
- Manager logs: `<proj_path>/log/<ManagerName><num>.log`
- When run by `WCCILpmon`, the manager number and startup order are defined in the pmon manager list
