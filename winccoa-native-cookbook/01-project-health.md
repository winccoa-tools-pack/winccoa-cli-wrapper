# Project Health

## Check if pmon is running

```
WCCILpmon -proj MyProject -status
# Returns: 0=running, 3=stopped, 4=unknown
```

## List all managers and their status

```
WCCILpmon -proj MyProject -command MGRLIST:LIST
WCCILpmon -proj MyProject -command MGRLIST:STATI
```

## View project info

```
WCCILpmon -proj MyProject -command PROJECT:
```

## Check pmon port and status with debug

```
WCCILpmon -proj MyProject -port 4999 -status -log +stderr
```
