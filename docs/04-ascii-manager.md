# WCCOAascii — ASCII Manager

The ASCII Manager is the primary tool for **bulk data exchange** with WinCC OA projects. It can:
- Export datapoints, types, configs, and values to ASCII files
- Import ASCII files back into the project
- Get or set individual datapoint values from the command line

**Important**: Combinations of `-in`, `-out`, and `-get` in the same command are **not allowed**.

## Four Operation Modes

### 1. Export to File (`-out`)

```
WCCOAascii -proj <name> [-filter TDACOPH] [-filterDp Name*;] [-filterDpType Type]
           [-filterFile <file>] [-filterCNS <view>]
           [-younger DD.[MM.[YYYY]][:HH[:MM]]]
           [-localTime] [-outputVersion 1|2|3|4] [-langList <list>]
           -out <filename>
```

### 2. Import from File (`-in`)

```
WCCOAascii -proj <name> [-wait] [-inactivateAlert] [-localTime]
           [-yes | -no] [-Typesyes | -Typesno] [-CNSyes | -CNSno]
           [-noAlertConfigHist] [-exportTimestamp] [-noVerbose]
           [-commit N] -in <filename-or-wildcard>
```

### 3. Set Single Value (`-set`)

```
WCCOAascii -proj <name> [-localTime] -set <dpname> <value>
```

### 4. Get Single Value (`-get`)

```
WCCOAascii -proj <name> [-localTime] -get <dpname> [-log +stderr]
```

## All Flags

### Output / Export Flags

| Flag | Description |
|------|-------------|
| `-out <filename>` | Export to this ASCII file |
| `-outputVersion 1\|2\|3\|4` | Output format: 1=old human-readable, 2=new (full multilang), 3=MASS_PARA, 4=MASS_PARA v4 |
| `-filter TDACOPH` | Filter which data to export (see filter letters below) |
| `-filterDp <name>[;name...]` | Limit export to specific DP names (supports wildcards: `Pump*`) |
| `-filterDpType <type>` | Limit export to DPs of this type |
| `-filterFile <file>` | Limit export to DPs and types listed in this file |
| `-filterCNS <view>` | Limit export to a CNS view, tree, or subtree |
| `-younger DD.[MM.[YYYY]][:HH[:MM]]` | Only export data newer than this timestamp |
| `-forceScan` | Force scan mode for filters |
| `-langList <list>` | Languages to export (default: all) |

### -filter Letter Meanings

| Letter | Data exported |
|--------|--------------|
| `T` | **T**ypes (datapoint type definitions) |
| `D` | **D**atapoints (DP instances) |
| `A` | **A**liases and comments |
| `C` | **C**NS (Corporate Namespace) views |
| `O` | **O**riginal/online values |
| `P` | **P**arametering (driver/config settings) |
| `H` | **H**istory modifier for P (includes archive history configs) |

Default (no `-filter`): exports all. To export only types and datapoints: `-filter TD`.

### Import Flags

| Flag | Description |
|------|-------------|
| `-in <file-or-wildcard>` | Import this file; supports wildcards: `*.dpl` |
| `-wait` | Don't exit after reading — stay running for online mode via `_AsciiManager.FileName` |
| `-yes` | Auto-confirm changes to existing DP types and CNS; don't ask |
| `-no` | Do NOT change existing DP types or CNS; don't ask |
| `-Typesyes` | Auto-confirm changes to DP types only |
| `-Typesno` | Do not change DP types |
| `-CNSyes` | Update existing CNS nodes during import |
| `-CNSno` | Do not update CNS nodes (no warnings) |
| `-inactivateAlert` | Deactivate alert handlers during import; re-enables based on `_active` attribute |
| `-noAlertConfigHist` | Do not increment configuration history (Raima projects only) |
| `-exportTimestamp` | If file has timestamps, use them when setting online values |
| `-noVerbose` | Suppress progress output (errors only) |
| `-commit N` | Send in batches of N messages to Event Manager (default: 10) |
| `-alwaysSendCommon` | Send alias/description even if unchanged |
| `-keepUntranslatedEmpty` | Don't replace untranslated text with another language |
| `-lupdate` | Update language translation files |

### Get/Set Flags

| Flag | Description |
|------|-------------|
| `-get <dpname>` | Read value of a DPE; output goes to log file unless `-log +stderr` |
| `-set <dpname> <value>` | Write value to a DPE |
| `-localTime` | Use local time for timestamps (default: GMT) |
| `-system` | Keep system name in referenced DPEs |
| `-ngaMigration <yamlfile>` | Migrate from HDB to NGA archive (provide YAML config) |

## Examples

### Export everything
```
WCCOAascii -proj MyProject -out D:\backup\export.dpl
```

### Export only type definitions
```
WCCOAascii -proj MyProject -filter T -out D:\backup\types.dpl
```

### Export specific DP with all configs
```
WCCOAascii -proj MyProject -filterDp "Pump1.*;" -out D:\backup\pump1.dpl
```

### Export data changed in the last 24 hours
```
WCCOAascii -proj MyProject -younger 0:00 -out D:\backup\recent.dpl
```

### Import a file, auto-confirming all changes
```
WCCOAascii -proj MyProject -yes -in D:\backup\export.dpl
```

### Import all .dpl files from a directory
```
WCCOAascii -proj MyProject -yes -in "D:\backup\*.dpl"
```

### Get a datapoint value (print to terminal)
```
WCCOAascii -proj MyProject -get Pump1.Speed -log +stderr
```

### Set a datapoint value
```
WCCOAascii -proj MyProject -set Pump1.Speed 42.5
```

### Import with timestamp preservation
```
WCCOAascii -proj MyProject -yes -exportTimestamp -in D:\backup\withTimestamps.dpl
```

## Permissions

- Importing datapoints requires **bit4 (admin) permission** on the WinCC OA user.
- Driver parameter imports require the corresponding driver manager to be running.
- Root/admin OS privileges are typically required for standard projects.

## Output Location

- Default log: `<proj_path>/log/WCCOAascii1.log`
- Error log: `<proj_path>/log/PVSS_II.log`
- Add `-log +stderr` to see output in the terminal
