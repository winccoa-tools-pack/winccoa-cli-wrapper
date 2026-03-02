# Data Export

## Export entire project database

```
WCCOAascii -proj MyProject -out D:\backup\full_export.dpl
```

## Export only datapoint types

```
WCCOAascii -proj MyProject -filter T -out D:\backup\types.dpl
```

## Export types and datapoints (no values)

```
WCCOAascii -proj MyProject -filter TD -out D:\backup\structure.dpl
```

## Export with all configs including archive history

```
WCCOAascii -proj MyProject -filter TDACOPH -out D:\backup\full.dpl
```

## Filter flags reference

| Flag | Exports |
|------|---------|
| `T`  | Types only |
| `D`  | Datapoints |
| `A`  | Alert configs |
| `C`  | Corrections |
| `O`  | Original values |
| `P`  | Param configs |
| `H`  | History (archive) |

## Export specific datapoints by name pattern

```
WCCOAascii -proj MyProject -filterDp "Pump*;" -out D:\backup\pumps.dpl
WCCOAascii -proj MyProject -filterDp "Pump1.*;Tank2.*;" -out D:\backup\selected.dpl
```

## Export specific DP type

```
WCCOAascii -proj MyProject -filterDpType Motor -out D:\backup\motors.dpl
```

## Export only recently changed data

```
# Data changed in last 24 hours (since midnight today):
WCCOAascii -proj MyProject -younger 0:00 -out D:\backup\today.dpl

# Data changed since a specific date:
WCCOAascii -proj MyProject -younger 01.01.2025:00:00 -out D:\backup\since_jan.dpl
```

## Export in multilanguage format

```
WCCOAascii -proj MyProject -outputVersion 2 -out D:\backup\multilang.dpl
```

## Export from a remote project

```
WCCOAascii -proj MyProject -data 192.168.1.100:4897 -event 192.168.1.100:4998 \
  -out D:\backup\remote_export.dpl
```
