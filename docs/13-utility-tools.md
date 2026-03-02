# Utility Tools

Miscellaneous WinCC OA tools for encryption, logging, media, and system information.

---

## WCCOAtoolCryptCtrl — Encrypt CTRL Scripts

Encrypts a CTRL script file (`.ctl`) to a compiled/encrypted form (`.ctc`) to protect source code.

### Usage

```
WCCOAtoolCryptCtrl <input_file> [output_file [-passPhrase <passphrase>]]
```

| Arg | Description |
|-----|-------------|
| `<input_file>` | Source `.ctl` script file |
| `[output_file]` | Output file (default: same name with `.ctc` extension) |
| `-passPhrase <phrase>` | Encryption passphrase (optional) |

### Examples

```
# Encrypt with default name (sms.ctl → sms.ctc)
WCCOAtoolCryptCtrl scripts\sms.ctl

# Encrypt with custom output file
WCCOAtoolCryptCtrl scripts\sms.ctl scripts\sms_encrypted.ctc

# Encrypt with passphrase
WCCOAtoolCryptCtrl scripts\sms.ctl scripts\sms.ctc -passPhrase MySecret123
```

Encrypted `.ctc` files can be loaded by WCCOActrl but cannot be read as plain text.

---

## WCCOAtoolLogViewer — Log Viewer

Opens the WinCC OA log viewer to inspect manager log files.

### Usage

```
WCCOAtoolLogViewer [options]
```

### Flags

| Flag | Description |
|------|-------------|
| `-stop` | Stop the first running LogViewer instance |
| `-single` | Exit if a LogViewer is already running |
| `-logFeed` | Use the ExternLogFeed plugin for log data |
| `-proj <name>` | Project to view logs for |
| `-config <file>` | Project via config file |
| `-lang <langName>` | Set display language |
| `-palette=dark\|light\|auto` | Color theme |
| `-dbg 2` | Show detailed tool activity |

### Example

```
# Open log viewer for a project
WCCOAtoolLogViewer -proj MyProject

# Open in dark mode
WCCOAtoolLogViewer -proj MyProject -palette=dark

# Stop any running log viewer
WCCOAtoolLogViewer -stop
```

---

## WCCOAtoolMedia / WCCOAtoolMediaSQLite — Media Management

Manages media files (images, sounds, etc.) in the project database. Requires a running project.

### Usage

```
WCCOAtoolMedia -proj <name> [options]
WCCOAtoolMediaSQLite -proj <name> [options]
```

Requires PVSS_II env var or `-proj`/`-config` flags. Shares [common flags](02-common-flags.md).

---

## AccVimaccDumpDb — AccVimacc Database Tool

Manages the AccVimacc (video/camera management) configuration database.

### Usage

```
AccVimaccDumpDb <options> <file>
```

### Flags

| Flag | Description |
|------|-------------|
| `-s <servers>` | Comma-separated config servers and optional UpdatePort (no spaces) |
| `-i` / `--import` | Import SQL/VIC into a running system (creates new database) |
| `-e` / `--export` | Export SQL/VIC from a running system |
| `-u` / `--update` | Update a running system with SQL |
| `-d` / `--diff` | Send SQL delta update to server |
| `-l` / `--license` | Send a license to the server |
| `-enc <bool>` / `--encryptedipcs` | Enable/disable IPC encryption |
| `-encf <file>` / `--encryptionPEM` | PEM file for encryption |
| `-` | Read input from stdin |

### Example

```
AccVimaccDumpDb -s Server1:9729,Server2 -i dump.sql
AccVimaccDumpDb -s Server1:9729 -e export.sql
```

---

## wida — (Unknown/Minimal Output)

`wida.exe` produces no output when run without arguments and is not further documented. Likely an internal WinCC OA development/diagnostic tool. Skip unless specifically documented for your version.

---

## WCCOAtoolParse — See Language Tools

See [11-language-tools.md](11-language-tools.md).
