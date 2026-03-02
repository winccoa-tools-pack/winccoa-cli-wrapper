# Project Setup & Identification

## How to Specify the Project

Every WinCC OA manager and tool requires project context. There are three methods (in priority order):

### 1. Named project (`-proj`)
```
WCCOAascii -proj MyProject -get Pump1.Speed
```
Requires the project to be registered in `pvssInst.conf`. This is the simplest method.

### 2. Config file path (`-config`)
```
WCCOAascii -config "D:\projects\MyProject\config\config" -get Pump1.Speed
```
Works even if the project is not registered. The last component of the path before `/config/config` becomes the project name.

### 3. Environment variable
```
set PVSS_II_PROJ=MyProject
WCCOAascii -get Pump1.Speed
```
Or using the full config path:
```
set PVSS_II=D:\projects\MyProject\config\config
WCCOAascii -get Pump1.Speed
```

## Auto-Registration

If a project isn't registered yet, use `-autoreg` (register if not already there) or `-autofreg` (force re-register):

```
WCCILpmon -config "D:\projects\MyProject\config\config" -autoreg
```

## Finding Registered Projects

The project registry lives at:
```
C:\ProgramData\Siemens\WinCC_OA\pvssInst.conf
```

Example content:
```ini
[MyProject]
proj_path = D:\projects\MyProject
version = 3.21
port = 4999
actualProject = 1    # this was the last-started project
```

The project with `actualProject = 1` is what `-currentproj` refers to.

## Common Project-Related Errors

| Error message | Cause | Fix |
|---------------|-------|-----|
| `could NOT get config file name` | No project specified | Add `-proj <name>` or `-config <path>` |
| `PVSS_II[_PROJ] environment variable is not set` | No env var and no flag | Set env var or add flag |
| `Error: project not registered` | `-proj` name not in pvssInst.conf | Use `-config` or `-autoreg` |

## Ports

Default ports (configurable in `config/config`):
- **Data Manager**: 4897
- **Event Manager**: 4998
- **Process Monitor**: 4999

Override connection target with:
```
-data  [hostname][:port]    # connect to a specific Data Manager
-event [hostname][:port]    # connect to a specific Event Manager
```

## Service Installation (Windows)

Install WCCILpmon as a Windows service (run as Administrator):
```
WCCILpmon -user NetworkService -install -set "D:\projects\MyProject\config\config" 1
```
- Last argument `1` = auto-start project; `0` = start pmon only
- Remove service: `WCCILpmon -remove`
- Service name defaults to `WCCILpmon`; override with `-name <servicename>`
- Start/stop: `net start WCCILpmon` / `net stop WCCILpmon`
