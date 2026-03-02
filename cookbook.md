# Cookbook — Common Tasks for AI Assistants

This cookbook provides ready-to-use CLI patterns for common WinCC OA automation tasks. Replace `MyProject` with your project name throughout.

---

## Project Health

### Check if pmon is running
```
WCCILpmon -proj MyProject -status
# Returns: 0=running, 3=stopped, 4=unknown
```

### List all managers and their status
```
WCCILpmon -proj MyProject -command MGRLIST:LIST
WCCILpmon -proj MyProject -command MGRLIST:STATI
```

### View project info
```
WCCILpmon -proj MyProject -command PROJECT:
```

---

## Starting and Stopping

### Start the project
```
WCCILpmon -proj MyProject
```

### Stop the project gracefully (wait for completion)
```
WCCILpmon -proj MyProject -stopWait
# Or use the script:
stop_wccoa.bat
```

### Force stop all WinCC OA processes
```
stop_wccoa.bat -killall
```

### Start a specific manager (by pmon index)
```
# List first to find index:
WCCILpmon -proj MyProject -command MGRLIST:LIST
# Then start:
WCCILpmon -proj MyProject -command SINGLE_MGR:START 3
```

### Stop a specific manager
```
WCCILpmon -proj MyProject -command SINGLE_MGR:STOP 3
```

---

## Reading and Writing Datapoints

### Read a single datapoint value
```
WCCOAascii -proj MyProject -get Pump1.Speed -log +stderr
```

### Write a single datapoint value
```
WCCOAascii -proj MyProject -set Pump1.Speed 42.5
WCCOAascii -proj MyProject -set MotorControl.Start TRUE
WCCOAascii -proj MyProject -set Tank1.Label "Main Tank"
```

### Read with local timezone
```
WCCOAascii -proj MyProject -get Pump1.LastUpdate -localTime -log +stderr
```

---

## Data Export

### Export entire project database
```
WCCOAascii -proj MyProject -out D:\backup\full_export.dpl
```

### Export only datapoint types
```
WCCOAascii -proj MyProject -filter T -out D:\backup\types.dpl
```

### Export types and datapoints (no values)
```
WCCOAascii -proj MyProject -filter TD -out D:\backup\structure.dpl
```

### Export with all configs including archive history
```
WCCOAascii -proj MyProject -filter TDACOPH -out D:\backup\full.dpl
```

### Export specific datapoints by name pattern
```
WCCOAascii -proj MyProject -filterDp "Pump*;" -out D:\backup\pumps.dpl
WCCOAascii -proj MyProject -filterDp "Pump1.*;Tank2.*;" -out D:\backup\selected.dpl
```

### Export specific DP type
```
WCCOAascii -proj MyProject -filterDpType Motor -out D:\backup\motors.dpl
```

### Export only recently changed data
```
# Data changed in last 24 hours (since midnight today):
WCCOAascii -proj MyProject -younger 0:00 -out D:\backup\today.dpl

# Data changed since a specific date:
WCCOAascii -proj MyProject -younger 01.01.2025:00:00 -out D:\backup\since_jan.dpl
```

### Export in multilanguage format
```
WCCOAascii -proj MyProject -outputVersion 2 -out D:\backup\multilang.dpl
```

---

## Data Import

### Import a file (auto-confirm all changes)
```
WCCOAascii -proj MyProject -yes -in D:\backup\export.dpl
```

### Import all .dpl files from a directory
```
WCCOAascii -proj MyProject -yes -in "D:\backup\*.dpl"
```

### Import without changing existing DP types
```
WCCOAascii -proj MyProject -no -in D:\backup\export.dpl
```

### Import only types (no type changes allowed)
```
WCCOAascii -proj MyProject -Typesyes -in D:\backup\types.dpl
```

### Import while deactivating alerts
```
WCCOAascii -proj MyProject -yes -inactivateAlert -in D:\backup\export.dpl
```

### Import with progress output suppressed
```
WCCOAascii -proj MyProject -yes -noVerbose -in D:\backup\export.dpl
```

---

## Running CTRL Scripts

### Run a project script
```
WCCOActrl -proj MyProject -log +stderr scripts/maintenance.ctl
```

### Run a script with arguments
```
WCCOActrl -proj MyProject -log +stderr scripts/export.ctl outputDir 2024-01-01
```

### Syntax-check a script without running it
```
WCCOActrl -proj MyProject -syntax scripts/myScript.ctl
```

### Run multiple scripts from a list file
```
WCCOActrl -proj MyProject -f scripts/batchJobs.txt
```

---

## Project Setup

### Create a new project database
```
WCCOAtoolCreateDb -proj MyProject -yes -log +stderr
```

### Create with NGA/InfluxDB archive support
```
WCCOAtoolCreateDb -proj MyProject -yes -useNGA influxdb -log +stderr
```

### Update database after WinCC OA version upgrade
```
WCCOAtoolCreateDb -proj MyProject -update -yes -log +stderr
```

### Repair database after dirty shutdown
```
# Stop project first, then:
WCCOAtoolRepairDb -proj MyProject -chkfs
# If that fails, full repair:
WCCOAtoolRepairDb -proj MyProject -all
```

---

## Remote / Distributed Projects

### Connect to a remote project
```
WCCOAascii -proj MyProject -data remotehost:4897 -event remotehost:4998 \
  -get Pump1.Speed -log +stderr
```

### Export from a remote project
```
WCCOAascii -proj MyProject -data 192.168.1.100:4897 -event 192.168.1.100:4998 \
  -out D:\backup\remote_export.dpl
```

---

## Windows Service

### Install as service (run as Administrator)
```
WCCILpmon -user NetworkService -install -set "D:\projects\MyProject\config\config" 1
net start WCCILpmon
```

### Reinstall service (update config)
```
net stop WCCILpmon
WCCILpmon -reinstall -set "D:\projects\MyProject\config\config" 1
net start WCCILpmon
```

### Check service status
```
WCCILpmon -proj MyProject -status
```

---

## Debugging and Diagnostics

### Enable verbose logging for a manager
```
WCCOActrl -proj MyProject -log +stderr -dbg 2 scripts/test.ctl
```

### Debug message traffic
```
WCCOAascii -proj MyProject -snd 1 -rcv 1 -get Pump1.Speed -log +stderr
```

### Generate diagnostic report
```
WCCOAascii -proj MyProject -report all -log +stderr
```

### Check pmon port and status with debug
```
WCCILpmon -proj MyProject -port 4999 -status -log +stderr
```

---

## License Management

### Get hardware fingerprint
```
WCCILtoolGetHW
```

### List installed licenses
```
WCCOAtoolGetCMLicInfo -listContainer -getText
```

### Update licenses online
```
WCCOAtoolCMactivation -serial 12345678 https://lc.codemeter.com/45845/portal
```

---

## Encrypt a CTRL Script

```
WCCOAtoolCryptCtrl scripts\secret.ctl
# Creates: scripts\secret.ctc
```

---

## Database Low-Level Inspection

```
# List database files:
cd D:\projects\MyProject\db
datdump dbname

# Dump a specific data file:
datdump -f D:\projects\MyProject\db dbname.dp

# Check integrity:
dbcheck -a D:\projects\MyProject\db

# Rebuild indexes:
keybuild D:\projects\MyProject\db
```
