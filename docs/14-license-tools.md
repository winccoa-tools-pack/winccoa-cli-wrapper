# License Tools

Tools for managing WinCC OA software licenses.

---

## WCCOAtoolCMactivation — CodeMeter License Activation

Manages WIBU CodeMeter licenses for WinCC OA. Handles online activation, container creation, and update import.

### Usage

```
WCCOAtoolCMactivation [options] [<license-portal-URL>]
```

The license portal URL (e.g., `https://lc.codemeter.com/45845/portal`) is mandatory for most operations.

### Operations

| Flag | Description |
|------|-------------|
| `-container` | Create a new CmContainer (requires `-lif`) |
| `-create` | Create context file for a CmContainer (requires `-serial`, `-firmcode`, `-context`) |
| `-import` | Import update file for a CmContainer (requires `-serial`, `-update`) |
| `-autoupdate` | Update licenses for a CmContainer (requires `-serial`; **default operation**) |
| `-download` | Download latest update file (use with `-update` and `-serial`) |
| `-confirm` | Confirm open transfer operations (use with `-context` and `-serial`) |
| `-info` | Get IP address of container server (requires `-serial`, `-firmcode`) |

### Parameters

| Flag | Description |
|------|-------------|
| `-serial <N>` | CmContainer serial number |
| `-firmcode <N>` | Firm code (mandatory for `-create` and `-info`) |
| `-context <file>` | WibuCmRaC context file |
| `-update <file>` | WibuCmRaU update file |
| `-lif <file>` | WibuCmLiF license info file |
| `-server <dns\|ip>` | Remote CodeMeter server (for `-container`, `-create`, `-import`) |
| `-comment <text>` | Comment shown in license history |
| `-logfile <file>` | Log file for output |
| `-interactive yes\|no` | Interactive (human-readable) vs JSON output mode (default: no/JSON) |
| `-verbose` | Print additional messages in non-interactive mode |
| `-accept` | Accept conditions for "restore" operation |
| `-help` | Print help |

### Examples

```
# Auto-update licenses (online)
WCCOAtoolCMactivation -serial 12345678 https://lc.codemeter.com/45845/portal

# Import a downloaded update file
WCCOAtoolCMactivation -serial 12345678 -import -update C:\licenses\update.WibuCmRaU

# Create a context file (for offline activation)
WCCOAtoolCMactivation -serial 12345678 -firmcode 101 -create -context C:\licenses\ctx.WibuCmRaC https://lc.codemeter.com/45845/portal

# Interactive mode for human-readable output
WCCOAtoolCMactivation -serial 12345678 -interactive yes https://lc.codemeter.com/45845/portal
```

---

## WCCOAtoolGetCMLicInfo — Get License Information

Retrieves WIBU CodeMeter licensing information from connected containers.

### Usage

```
WCCOAtoolGetCMLicInfo -listContainer [-containerInfo:<nr>] [-getXml | -getText]
```

### Flags

| Flag | Description |
|------|-------------|
| `-listContainer` | List all containers as "box-serialnumber" |
| `-containerInfo:<nr>` | Get information from container number `<nr>` |
| `-getXml` | Return information as XML |
| `-getText` | Return information as text |
| `-searchMode:<mode>` | Search mode: `LOCAL` (default) or `LOCAL+LAN` |
| `-noErrorOutput` | Suppress error messages (important when using `-getXml` for valid XML) |
| `-doNotReturnErrorCode` | Return 0 even on errors |

### Examples

```
# List all license containers
WCCOAtoolGetCMLicInfo -listContainer -getText

# Get XML info about container 0
WCCOAtoolGetCMLicInfo -listContainer -containerInfo:0 -getXml

# Search in network too
WCCOAtoolGetCMLicInfo -listContainer -searchMode:LOCAL+LAN -getText
```

---

## WCCILtoolGetHW — Get Hardware Code

Outputs the hardware fingerprint code used for license generation.

### Usage

```
WCCILtoolGetHW
```

### Output

```
[license]
code    = "dinm5CG2520M86 32328386151"
version = 32100002
```

The `code` value is provided to Siemens/ETM to generate a license file for this specific hardware. No flags required.

---

## WCCILtoolLicenseMLFB — Get License MLFB

Outputs the license MLFB (order number) for this WinCC OA installation.

### Usage

```
WCCILtoolLicenseMLFB
```

### Output

```
MLFB : SBKPF
```

No flags required. The MLFB is used when ordering WinCC OA licenses.

---

## S7PlusLicensing

License management tool for S7+ driver licensing. Run without arguments or with `-help` to see options.

```
S7PlusLicensing.exe
```
