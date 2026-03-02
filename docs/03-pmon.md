# WCCILpmon — Process Monitor

The Process Monitor is the **parent process** for all WinCC OA managers. It starts, monitors, restarts, and stops all other managers. There is one pmon per project.

## Basic Usage

```
WCCILpmon [common-flags] [pmon-specific-flags]
```

## Pmon-Specific Flags

| Flag | Description |
|------|-------------|
| `-n`, `-noAutostart` | Start pmon without auto-starting the project |
| `-stop` | Stop the running project (send stop signal) |
| `-stopWait` | Stop the project and wait until fully shut down |
| `-status` | Check pmon status: returns `0`=running, `3`=stopped, `4`=unknown |
| `-port <N>` | Override TCP port for command communication |
| `-auth <olduser> <oldpass> <user> <pass>` | Set or change write-access credentials (max 10 chars each; use `""` to remove) |
| `-command <cmd> [args]` | Send a command to the running pmon over TCP |
| `-helpcommand` | List all available `-command` subcommands |
| `-install` | Install WCCILpmon as a Windows service |
| `-set <configFile> <autostart>` | Set config file and autostart for service (`0`=no, `1`=yes) |
| `-remove` | Remove the Windows service |
| `-reinstall` | Remove then reinstall the Windows service |
| `-name <servicename>` | Override service name (default: `WCCILpmon`) |
| `-user <account>` | Service account (e.g., `LocalService`, `NetworkService`, or domain account) |

## Remote Control via `-command`

The `-command` interface lets you control a running pmon from another shell without a GUI. Run `-helpcommand` to see the full list:

```
WCCILpmon -proj MyProject -helpcommand
```

### Available Commands

```
WCCILpmon -proj MyProject -command START_ALL
WCCILpmon -proj MyProject -command STOP_ALL
WCCILpmon -proj MyProject -command RESTART_ALL
WCCILpmon -proj MyProject -command WAIT_MODE

# Single manager by index (0-based from pmon list):
WCCILpmon -proj MyProject -command SINGLE_MGR:START <idx>
WCCILpmon -proj MyProject -command SINGLE_MGR:STOP <idx>
WCCILpmon -proj MyProject -command SINGLE_MGR:KILL <idx>
WCCILpmon -proj MyProject -command SINGLE_MGR:DEL <idx>

# Insert manager at index:
WCCILpmon -proj MyProject -command SINGLE_MGR:INS <idx> <manager> <startmode> <seckill> <restartcount> <resetmin> <args>

# Get/set manager properties:
WCCILpmon -proj MyProject -command SINGLE_MGR:PROP_GET <idx>
WCCILpmon -proj MyProject -command SINGLE_MGR:PROP_PUT <idx> <startmode> <seckill> <restartcount> <resetmin> <args>

# Debug a manager:
WCCILpmon -proj MyProject -command SINGLE_MGR:DEBUG <idx> <args>

# List all managers and their status:
WCCILpmon -proj MyProject -command MGRLIST:LIST
WCCILpmon -proj MyProject -command MGRLIST:STATI

# Project info:
WCCILpmon -proj MyProject -command PROJECT:
```

### Manager Start Modes (for SINGLE_MGR:INS and PROP_PUT)

| Value | Meaning |
|-------|---------|
| `0` | Manual (not auto-started) |
| `1` | Once (start once at project start) |
| `2` | Always (always restart on crash) |

## Common Pmon Tasks

### Check if project is running
```
WCCILpmon -proj MyProject -status
# Returns: 0 = running, 3 = stopped, 4 = unknown
```

### Start the project
```
WCCILpmon -proj MyProject
```

### Stop the project gracefully
```
WCCILpmon -proj MyProject -stop
```

### Stop and wait for shutdown
```
WCCILpmon -proj MyProject -stopWait
```

### Start pmon without starting the project
```
WCCILpmon -proj MyProject -n
```

### Install as Windows service
```
# Run as Administrator:
WCCILpmon -user NetworkService -install -set "D:\projects\MyProject\config\config" 1
net start WCCILpmon
```

### List all managers in the project
```
WCCILpmon -proj MyProject -command MGRLIST:LIST
```

### Start a specific manager (by index)
```
# First list managers to find the index:
WCCILpmon -proj MyProject -command MGRLIST:LIST
# Then start index 3:
WCCILpmon -proj MyProject -command SINGLE_MGR:START 3
```

## Manager Startup Order

**Critical**: The Data Manager must start before the Event Manager and all other managers.

Correct order:
1. `WCCILdata` (Data Manager)
2. `WCCILevent` (Event Manager)
3. All other managers (CTRL, ASCII, drivers, UI, etc.)

WCCILpmon enforces this via the start sequence numbers configured in the console panel.

## Notes

- Pmon writes its own log to `<proj_path>/log/WCCILpmon1.log`
- The TCP command port defaults to the pmon port from `config/config`; override with `-port`
- On Windows, pmon can be started as a service OR as an interactive console application
- If started with `-log +stderr` under Windows, pmon runs as a console application (not service mode)
