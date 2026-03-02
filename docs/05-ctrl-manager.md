# WCCOActrl & ctrl.exe — CTRL Script Execution

WinCC OA has its own scripting language called **CTRL** (similar to C). There are two tools for running CTRL:

| Tool | Use Case |
|------|----------|
| `WCCOActrl` | Runs scripts **connected to a live project** (has access to datapoints, events) |
| `ctrl.exe` | Runs scripts **standalone** (no project connection, for syntax checks) |

## WCCOActrl

Full-featured CTRL Manager that connects to a running project.

### Usage

```
WCCOActrl -proj <name> [common-flags] [ctrl-flags] <scriptfile> [arg ...]
WCCOActrl -proj <name> [common-flags] -f <scriptListFile>
```

### CTRL-Specific Flags

| Flag | Description |
|------|-------------|
| `<scriptfile> [arg ...]` | CTRL script file (must be in `scripts\` dir of the project) and optional arguments |
| `-f <scriptListFile>` | Load and execute all scripts listed in this file |
| `-n` | Do NOT connect to Data/Event Manager (offline mode) |
| `-syntax` | Syntax-check the script and exit without running it |
| `-proxy <HTTP-Proxy-URL>` | Use this HTTP proxy for HTTP requests made in scripts |

### Script Files

Scripts must be `.ctl` files. They can be:
- Relative paths within `<proj_path>/scripts/`
- Full absolute paths

### Examples

```
# Run a maintenance script
WCCOActrl -proj MyProject -log +stderr scripts/maintenance.ctl

# Syntax check only
WCCOActrl -proj MyProject -syntax scripts/myScript.ctl

# Run script with arguments
WCCOActrl -proj MyProject scripts/export.ctl arg1 arg2

# Run without connecting to Data/Event manager
WCCOActrl -proj MyProject -n scripts/localScript.ctl

# Run a list of scripts
WCCOActrl -proj MyProject -f scripts/batchList.txt
```

### Connecting to Remote Project

```
WCCOActrl -proj MyProject -data remotehost:4897 -event remotehost:4998 scripts/remote.ctl
```

## ctrl.exe (Standalone)

Minimal CTRL runner for standalone/offline use. No project connection required.

### Usage

```
ctrl.exe [options] <scriptfile>
```

### Options

| Flag | Description |
|------|-------------|
| `-dbg <flags>` | Debug flags |
| `-version` | Print version and exit |

### Example

```
ctrl.exe scripts/utility.ctl
```

**Note**: `ctrl.exe` cannot access datapoints or project data. It's mainly useful for CTRL utility scripts that don't need a running project.

## CTRL Script File Structure

```ctrl
// my_script.ctl
main()
{
  dyn_string ds = dpNames("*", "TypeName");
  int i;
  for (i = 1; i <= dynlen(ds); i++) {
    DebugTN("DP:", ds[i]);
  }
}
```

## Running Scripts via MCP Server

The WinCC OA MCP server executes CTRL snippets via `WinccoaCtrlScript()`:
```
WinccoaCtrlScript(managerNum, codeString, functionName, params?, types?)
```
This is different from running a `.ctl` file — it injects code directly into a running CTRL manager.
