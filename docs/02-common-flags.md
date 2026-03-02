# Common Flags (All Managers)

All WinCC OA managers (WCCILpmon, WCCOAascii, WCCOActrl, WCCILdata, WCCILevent, WCCILdist, WCCILredu, WCCOAopcua, WCCOAnextgenarch, etc.) share this common set of flags.

## Project Identification

| Flag | Description |
|------|-------------|
| `-proj <name>` | Project by registered name (looks up pvssInst.conf) |
| `-PROJ <name>` | Same as `-proj` (legacy spelling) |
| `-config <file>` | Project by config file path (e.g., `D:\proj\MyProj\config\config`) |
| `-currentproj` | Use the last-started project (reads `actualProject` from pvssInst.conf) |
| `-autoreg` | Auto-register the project if not yet registered (requires `-config` or `PVSS_II` env) |
| `-autofreg` | Force re-register the project (deletes existing registration) |

## Logging

| Flag | Description |
|------|-------------|
| `-log +stderr` | Enable logging to stderr (see output in terminal) |
| `-log +stdout` | Enable logging to stdout |
| `-log +file` | Enable logging to file (default location) |
| `-log -stderr` | Disable logging to stderr |
| `-log -file` | Disable logging to file |
| `-reportfile <path>` | Write reports to file; or `stderr`/`stdout` |
| `-report x[,y,...]` | Generate diagnostic reports (run `-helpreport` for options) |
| `-helpreport` | Print available report options |

## Connection

| Flag | Description |
|------|-------------|
| `-data [host][:port]` | Connect to Data Manager at host:port (default: `localhost:4897`) |
| `-event [host][:port]` | Connect to Event Manager at host:port (default: `localhost:4998`) |
| `-num <N>` | Manager instance number (default: 1; must be unique per manager type) |
| `-user <user>[:pass]` | Run as this WinCC OA user (not OS user) |
| `-connectToRedundantHosts` | Connect to both redundant hosts simultaneously |

## Debugging

| Flag | Description |
|------|-------------|
| `-dbg x[,y,...]` | Enable debug levels (run `-helpdbg` for valid values) |
| `-helpdbg` | Print debug level options |
| `-snd 0\|1\|2` | Debug output for outgoing messages (0=off, 1=basic, 2=verbose) |
| `-rcv 0\|1\|2` | Debug output for incoming messages |
| `-sndFilterMan all\|<list>` | Filter send debug by manager list |
| `-sndFilterMsg all\|<list>` | Filter send debug by message type list |
| `-rcvFilterMan all\|<list>` | Filter receive debug by manager |
| `-rcvFilterMsg all\|<list>` | Filter receive debug by message type |
| `-perf` | Gather statistical data about execution paths |

## Language & Libraries

| Flag | Description |
|------|-------------|
| `-lang <pvssLangName>` | Set default language (e.g., `en_US.utf8`) |
| `-loadAllCtrlLibs` | Load all CTRL libraries under `scripts/libs` |
| `-loadNoCtrlLib` | Load no CTRL library |
| `-loadCtrlLibs x[,y,...]` | Load specified CTRL libraries only |
| `-noUserCtrlExt` | Disallow CTRL extensions from any proj_path |
| `-coveragereportfile <file>` | Write CTRL code coverage report to file |

## General

| Flag | Description |
|------|-------------|
| `-help` | Print help message and exit |
| `-version` | Print version and creation date, then exit |
| `-extend` | Enable extended functionality |

## Flag Patterns to Remember

```
# Most concise project start:
WCCOAascii -proj MyProject -log +stderr ...

# Debugging a remote connection:
WCCOAascii -proj MyProject -data remotehost:4897 -event remotehost:4998 -snd 1 -rcv 1

# Running as a specific user:
WCCOAascii -proj MyProject -user admin:password ...

# Verbose logging with manager number:
WCCOAascii -proj MyProject -num 3 -log +stderr -dbg 2 ...
```
