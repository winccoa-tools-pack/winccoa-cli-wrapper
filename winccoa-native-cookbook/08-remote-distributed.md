# Remote and Distributed Projects

## Connect to a remote project

```
WCCOAascii -proj MyProject -data remotehost:4897 -event remotehost:4998 \
  -get Pump1.Speed -log +stderr
```

## Export from a remote project

```
WCCOAascii -proj MyProject -data 192.168.1.100:4897 -event 192.168.1.100:4998 \
  -out D:\backup\remote_export.dpl
```

## Write to a datapoint on a remote project

```
WCCOAascii -proj MyProject -data remotehost:4897 -event remotehost:4998 \
  -set Pump1.Speed 42.5
```

## Standard port numbers

| Manager | Default Port |
|---------|-------------|
| Data manager | 4897 |
| Event manager | 4998 |
| pmon | 4999 |

## Start distribution manager (for multi-system setups)

```
WCCILdist -proj MyProject -log +stderr
```

## Start redundancy manager

```
WCCILredu -proj MyProject -log +stderr
```
