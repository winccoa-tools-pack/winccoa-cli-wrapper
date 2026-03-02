# WinCC OA Native CLI Cookbook

Ready-to-use recipes using WinCC OA's **native** command-line tools.
No wrappers — these are the real binaries that ship with WinCC OA.
Replace `MyProject` with your actual project name throughout.

> **Have the `wcoa` CLI?** It wraps these same binaries with version management
> and short aliases. See [`../cli/`](../cli/README.md).

---

## Recipes

| File | Topic |
|------|-------|
| [01-project-health.md](01-project-health.md) | Status checks, manager list |
| [02-start-stop.md](02-start-stop.md) | Starting/stopping the project and individual managers |
| [03-datapoints.md](03-datapoints.md) | Reading and writing datapoint values |
| [04-export.md](04-export.md) | All data export patterns |
| [05-import.md](05-import.md) | All data import patterns |
| [06-ctrl-scripts.md](06-ctrl-scripts.md) | Running and encrypting CTRL scripts |
| [07-project-setup.md](07-project-setup.md) | Creating/upgrading project databases |
| [08-remote-distributed.md](08-remote-distributed.md) | Remote and distributed project access |
| [09-windows-service.md](09-windows-service.md) | Windows service install/manage |
| [10-diagnostics.md](10-diagnostics.md) | Debugging, verbose logging, diagnostics |
| [11-license.md](11-license.md) | Hardware ID, license query, online activation |
| [12-database-lowlevel.md](12-database-lowlevel.md) | Raima DB dump, check, rebuild |

---

## Universal Rules

| Rule | Detail |
|------|--------|
| **Project context is mandatory** | Every manager needs `-proj <name>` or `-config <path>` |
| **Log to terminal** | Add `-log +stderr` — by default logs go to `<proj>/log/` |
| **Binary location** | `C:\Program Files\Siemens\WinCC_OA\<version>\bin\` |
| **Startup order** | `WCCILdata` → `WCCILevent` → everything else |
| **Exit codes** | `0` = success, non-zero = error |
| **Help flag** | Every binary supports `-help` and `-version` |
