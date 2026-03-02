# Database Maintenance Tools

Tools for repairing, inspecting, and maintaining WinCC OA project databases.

---

## WCCOAtoolRepairDb — Repair Project Database

Checks and repairs the Raima database, specifically archive filesets. Use after abnormal shutdowns or database corruption.

### Usage

```
WCCOAtoolRepairDb -proj <name> [options]
```

### Flags

| Flag | Description |
|------|-------------|
| `-help` | Print help |
| `-chkvfs` | Check for missing **value** filesets and correct DB |
| `-chkafs` | Check for missing **alert** filesets and correct DB |
| `-chkfs` | Execute `-chkvfs` and `-chkafs` |
| `-delvfs current` | Delete the current value fileset |
| `-delvfs previous` | Delete the last recently closed value fileset |
| `-delvfs <dirname>` | Delete the value fileset specified by directory name |
| `-delafs current` | Delete the current alert fileset |
| `-delafs living` | Delete the living alert fileset |
| `-delafs overflow` | Delete the overflow alert fileset |
| `-delafs <dirname>` | Delete the alert fileset specified by directory name |
| `-delafs all` | Delete all alert filesets |
| `-replv current` | Replace last values with current value fileset |
| `-replv previous` | Replace last values with value fileset before current |
| `-all` | Execute `-chkfs`, `-delafs all`, and `-replv current` |
| `-incvfs <dirname>` | Include value fileset specified by directory name |

### Examples

```
# Check and repair all filesets
WCCOAtoolRepairDb -proj MyProject -chkfs

# Full repair (checks, clears alerts, restores values)
WCCOAtoolRepairDb -proj MyProject -all

# Delete current alert fileset (use after corrupt alert data)
WCCOAtoolRepairDb -proj MyProject -delafs current
```

---

## WCCOAtoolRevise — Revise Archive Dataset

Revises/inspects a specific archive dataset path.

### Usage

```
WCCOAtoolRevise -help
WCCOAtoolRevise <DataSetPath>
```

| Arg | Description |
|-----|-------------|
| `<DataSetPath>` | Path to dataset, e.g., `/PVSS/Proj/db/wincc_oa/al0999999` |

---

## WCCOAtoolBackupDbSqlite — Backup SQLite Database

Creates a backup copy of a SQLite database file.

### Usage

```
WCCOAtoolBackupDbSqlite.exe <input_file.sqlite> <output_file.sqlite>
```

### Example

```
WCCOAtoolBackupDbSqlite D:\projects\MyProject\db\main.sqlite D:\backup\main_backup.sqlite
```

---

## WCCOAtoolRepairDb vs WCCILdata -repair

| Tool | When to use |
|------|-------------|
| `WCCOAtoolRepairDb` | Offline repair — project must NOT be running |
| `WCCILdata -repair on` | Repair on startup — Data Manager checks on start |

Always stop the project before running `WCCOAtoolRepairDb`.

---

## Raima Low-Level Tools

For deep database inspection and repair at the Raima level. See [12-raima-tools.md](12-raima-tools.md).
