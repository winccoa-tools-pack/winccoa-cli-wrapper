# Shell Scripts

Batch/CMD scripts bundled with WinCC OA for common operations.

---

## stop_wccoa.bat — Stop All WinCC OA Processes

Gracefully stops the current WinCC OA project and optionally all WinCC OA processes.

### Usage

```
stop_wccoa.bat [-nowait|-nw] | [-wait <secs>] [-killall|-all] [{-e <pattern>} ...]
```

### Flags

| Flag | Description |
|------|-------------|
| `-nowait` / `-nw` | Don't wait for all processes to die (only current project) |
| `-wait <secs>` | Wait at most N seconds for shutdown (default: 600) |
| `-killall` / `-all` | Stop ALL WinCC OA processes (including service), not just current project |
| `-e <pattern>` | Also try to stop processes matching this grep pattern |

### What it does

1. Calls `WCCILpmon -stop -currentproj` for graceful shutdown
2. Polls `WCCILpmon -status -currentproj` every 2 seconds until stopped
3. With `-killall`: stops the WinCC OA Windows service (`net stop WCCOA-Service`)
4. After timeout: uses `taskkill` to terminate all `WCCOA*`, `WCCIL*`, `PVSStest*` processes
5. Falls back to `taskkill /F` (force kill) if soft termination fails
6. Returns exit code 3 if any processes remain after all attempts

### Examples

```
# Stop the current project (wait up to 600s)
stop_wccoa.bat

# Stop immediately without waiting
stop_wccoa.bat -nowait

# Stop everything, wait max 120s
stop_wccoa.bat -killall -wait 120

# Stop and also kill custom processes
stop_wccoa.bat -killall -e myCustomProcess
```

---

## kill_pvss2.bat — Legacy Stop Script (Deprecated)

Deprecated wrapper that delegates to `stop_wccoa.bat`. Do not use for new scripts.

```
kill_pvss2.bat [same args as stop_wccoa.bat]
```

Outputs: `"This script is deprecated and will be removed in the future. Please use stop_wccoa.bat instead."`

---

## startConsole.cmd — Start WinCC OA Console

Launches the WinCC OA Console (graphical project manager) via `WCCOAui -console`.

### Usage

```
startConsole.cmd [additional WCCOAui args...]
```

### Examples

```
# Open console for current project
startConsole.cmd

# Open console for a specific project
startConsole.cmd -proj MyProject
```

Internally runs: `start WCCOAui -console [args...]`

---

## startPA.cmd — Start Project Administrator

Launches the WinCC OA Project Administrator UI via `WCCOAui -projAdmin`.

### Usage

```
startPA.cmd [additional WCCOAui args...]
```

### Examples

```
# Open Project Administrator
startPA.cmd

# Open for specific project
startPA.cmd -proj MyProject
```

Internally runs: `start WCCOAui -projAdmin [args...]`

---

## killdbg.cmd — Send Debug Signal to Manager

Sends a debug dump signal (SIGQUIT / signal 3) to a WinCC OA manager process to trigger a debug dump without stopping it.

### Usage

```
killdbg.cmd <pid-or-manager-name>
```

### How it works

1. Resolves manager name to PID via `tasklist` (checks `.exe`, `WCCOA*.exe`, `WCCIL*.exe` patterns)
2. Writes signal action to `<proj_path>/log/dbg`
3. Sends signal 3 via `pkill -3 <pid>` (requires Cygwin `pkill`)

### Example

```
# Send debug signal by PID
killdbg.cmd 12345

# Send debug signal by manager name
killdbg.cmd WCCOActrl
```

---

## crashAction_sample.cmd — Crash Action Hook Template

A **template** (not used directly) called by WinCC OA Console when a manager crashes.

### Parameters (provided by Console on crash)

| Position | Arg | Values |
|----------|-----|--------|
| `%1` | `next_action` | `NO_RESTART`, `RESTART_ALL`, `RESTART_THIS`, `NO_RESTART_ANY_MORE` |
| `%2` | `manager` | The crashed manager executable name |
| `%3+` | `manager parameters` | The manager's configured arguments |

### Customizing

Replace the `net send` command in the sample with your notification mechanism (email, SNMP trap, REST API call, etc.):

```batch
rem Notify via email:
sendEmail -f from@example.com -t ops@example.com ^
  -s mailserver -u "WinCC OA crash" ^
  -m "Manager %2 crashed: %1 - %3 %4 %5"
```

Configure the crash action path in the WinCC OA Console panel (Project > Properties > Crash Action).

---

## WCCOAui — UI Manager (Not a Script)

The graphical UI manager is `WCCOAui.exe`. Key modes:

| Mode | Command | Description |
|------|---------|-------------|
| Console | `WCCOAui -console` | Open pmon Console Panel |
| Project Admin | `WCCOAui -projAdmin` | Open Project Administrator |
| Normal UI | `WCCOAui -proj <name>` | Open UI panels for project |
| GEDI | `WCCOAui -proj <name> -m gedi` | Open Graphical EDItor |
