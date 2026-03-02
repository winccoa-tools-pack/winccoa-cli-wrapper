# Project Setup

## Create a new project database

```
WCCOAtoolCreateDb -proj MyProject -yes -log +stderr
```

## Create with NGA/InfluxDB archive support

```
WCCOAtoolCreateDb -proj MyProject -yes -useNGA influxdb -log +stderr
```

## Update database after WinCC OA version upgrade

```
WCCOAtoolCreateDb -proj MyProject -update -yes -log +stderr
```

## Repair database after dirty shutdown

```
# Stop project first, then:
WCCOAtoolRepairDb -proj MyProject -chkfs

# If that fails, full repair:
WCCOAtoolRepairDb -proj MyProject -all
```

## Convert database to a newer format

```
WCCOAtoolConvertDb -proj MyProject -yes -log +stderr
```

## Sync datapoint types from a reference project

```
WCCOAtoolSyncTypes -proj MyProject -ref ReferenceProject -yes
```

## Rebuild DP ID list (after corruption)

```
WCCOAtoolBuildIdList -proj MyProject -log +stderr
```
