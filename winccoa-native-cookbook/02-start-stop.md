# Starting and Stopping

## Start the project

```
WCCILpmon -proj MyProject
```

## Stop the project gracefully (wait for completion)

```
WCCILpmon -proj MyProject -stopWait
# Or use the script:
stop_wccoa.bat
```

## Force stop all WinCC OA processes

```
stop_wccoa.bat -killall
```

## Start a specific manager (by pmon index)

```
# List first to find the index:
WCCILpmon -proj MyProject -command MGRLIST:LIST

# Then start by index:
WCCILpmon -proj MyProject -command SINGLE_MGR:START 3
```

## Stop a specific manager

```
WCCILpmon -proj MyProject -command SINGLE_MGR:STOP 3
```

## Manual startup order (when not using pmon)

```
# 1. Data manager first
WCCILdata -proj MyProject -log +stderr

# 2. Event manager second
WCCILevent -proj MyProject -log +stderr

# 3. All others (distribution, redundancy, drivers, etc.)
WCCILdist -proj MyProject -log +stderr
```
