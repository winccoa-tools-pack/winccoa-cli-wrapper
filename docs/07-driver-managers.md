# Driver Managers

Driver managers connect WinCC OA to external devices and systems. All share the [common flags](02-common-flags.md) and require a running `WCCILdata` and `WCCILevent`.

All driver managers use `-num <N>` to set the driver number, which must match the driver configuration in the project database.

## Driver Manager Overview

| Executable | Protocol | Notes |
|-----------|----------|-------|
| `WCCOAopcua` | OPC UA Client | Connects to OPC UA servers |
| `WCCOAopcuasrv` | OPC UA Server | Exposes WinCC OA data as OPC UA server |
| `WCCOAopc` | OPC DA Client | Legacy OPC Data Access (DCOM) |
| `WCCOAopcsrv` | OPC DA Server | Legacy OPC DA server |
| `WCCOAopcAE` | OPC AE Client | OPC Alarm & Events client |
| `WCCOAopchda` | OPC HDA Client | OPC Historical Data Access |
| `WCCOAbacnet` | BACnet | Building automation |
| `WCCOAmod` | Modbus RTU/TCP | Modbus protocol |
| `WCCOAmodsrv` | Modbus Server | Exposes WinCC OA as Modbus server |
| `WCCOAmqtt` | MQTT | IoT messaging |
| `WCCOAmqttpub` | MQTT Publisher | MQTT publish mode |
| `WCCOAs7` | SIMATIC S7 | Siemens S7 PLC (classic) |
| `WCCOAs7plus` | SIMATIC S7+ | Siemens S7-1500/S7-1200 |
| `WCCOAsbus` | SIMATIC S5 | Legacy S5 bus |
| `WCCOAsnmp` | SNMP Agent | Network device monitoring |
| `WCCOAsnmpa` | SNMP Agent+ | Extended SNMP |
| `WCCOAiec` | IEC 60870-5 | Power system telecontrol |
| `WCCOAiec61850` | IEC 61850 | Substation automation |
| `WCCOAdnp3` | DNP3 | Utility automation |
| `WCCOArdb` | RDB | Relational database connector |
| `WCCOAeip` | EtherNet/IP | Rockwell/Allen-Bradley PLCs |
| `WCCOArk512` | RK512 | Siemens RK512 |
| `WCCOAssi` | SSI | |
| `WCCOAsinaut` | SINAUT | Siemens SINAUT telecontrol |
| `WCCOAsecs` | SECS/GEM | Semiconductor equipment |
| `WCCOAntcipgw` | NTCIP Gateway | Traffic management |
| `WCCOAtlsgw` | TLS Gateway | TLS-secured gateway |
| `WCCOApid` | PID | PID controller |
| `WCCOAvideoOA` | Video | Camera/video integration |

## Common Usage Pattern

All drivers follow the same pattern:

```
<DriverExe> -proj <name> -num <driverNum> -log +stderr
```

The `-num` value must match the driver number configured in the pmon manager list and the project database.

## OPC UA Client (WCCOAopcua)

```
WCCOAopcua -proj MyProject -num 1 -log +stderr
```

Connects to OPC UA servers defined in the project's OPC UA configuration DPs. The connection parameters (endpoint URL, security, certificates) are configured via the project database, not via CLI flags.

## OPC UA Server (WCCOAopcuasrv)

```
WCCOAopcuasrv -proj MyProject -num 1 -log +stderr
```

Exposes the WinCC OA project data as an OPC UA server endpoint.

## Modbus (WCCOAmod)

```
WCCOAmod -proj MyProject -num 2 -log +stderr
```

## SIMATIC S7+ (WCCOAs7plus)

```
WCCOAs7plus -proj MyProject -num 3 -log +stderr
```

## Starting Drivers via Pmon

The preferred way to manage drivers is via pmon:

```
# Check if driver is in manager list:
WCCILpmon -proj MyProject -command MGRLIST:LIST

# Start the driver at index N:
WCCILpmon -proj MyProject -command SINGLE_MGR:START <idx>

# Stop the driver:
WCCILpmon -proj MyProject -command SINGLE_MGR:STOP <idx>
```

## Notes

- Driver configurations (connection settings, address mapping) live in the WinCC OA database, not in CLI args
- Multiple driver instances of the same type can run with different `-num` values
- When a driver crashes, pmon can auto-restart it based on the manager's `startmode` setting
- Driver logs: `<proj_path>/log/<DriverName><num>.log`
