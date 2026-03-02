# InfluxDB Tools (NGA Backend)

WinCC OA bundles InfluxDB binaries for use with the Next Generation Archive (NGA) backend. These are standard InfluxDB 1.x tools.

**Location**: `C:\Program Files\Siemens\WinCC_OA\3.21\bin\`

---

## influx — InfluxDB CLI Client

The InfluxDB command-line client for querying and managing InfluxDB.

### Usage

```
influx [flags]
influx [command]
```

### Common Flags

```
influx -host localhost -port 8086 -database mydb -execute "SHOW MEASUREMENTS"
```

| Flag | Description |
|------|-------------|
| `-host <host>` | InfluxDB host (default: localhost) |
| `-port <port>` | InfluxDB port (default: 8086) |
| `-database <db>` | Database to connect to |
| `-username <user>` | Username |
| `-password <pass>` | Password |
| `-execute <query>` | Execute query and exit |
| `-format json\|csv\|column` | Output format |
| `-precision <prec>` | Timestamp precision (ns, us, ms, s, m, h) |
| `-ssl` | Use HTTPS |
| `-unsafeSsl` | Skip SSL verification |

### Common Queries

```
# Connect to NGA InfluxDB instance
influx -host localhost -port 8086

# List databases
influx -execute "SHOW DATABASES"

# List measurements (like tables) in a database
influx -database nga_db -execute "SHOW MEASUREMENTS"

# Query recent data
influx -database nga_db -execute "SELECT * FROM \"MyDP.Value\" ORDER BY time DESC LIMIT 10"

# Check retention policies
influx -database nga_db -execute "SHOW RETENTION POLICIES"
```

---

## influxd — InfluxDB Server Daemon

The InfluxDB server process. When used with WinCC OA NGA, this is typically managed by `WCCOAnextgenarch` — do not start it manually unless you know what you're doing.

### Usage

```
influxd [command] [flags]
influxd run [flags]
```

### Key Flags (run command)

| Flag | Description |
|------|-------------|
| `-config <file>` | Path to InfluxDB config file |
| `-pidfile <file>` | PID file location |
| `-cpuprofile <file>` | Write CPU profile |
| `-memprofile <file>` | Write memory profile |

### Example

```
# Start InfluxDB with a config file
influxd run -config "C:\Program Files\Siemens\WinCC_OA\3.21\data\influxdb.conf"
```

---

## influx_inspect — InfluxDB Inspection Tool

Inspects and repairs InfluxDB data files (TSM storage engine).

### Usage

```
influx_inspect <command> [flags]
```

### Commands

| Command | Description |
|---------|-------------|
| `buildtsi` | Rebuild the TSI index |
| `deletetsm` | Delete TSM data |
| `dumptsi` | Dump TSI index file |
| `dumptsm` | Dump TSM data |
| `dumpwal` | Dump WAL (Write-Ahead Log) |
| `export` | Export data to line protocol format |
| `verify` | Verify integrity of TSM files |
| `verify-seriesfile` | Verify series file integrity |
| `report` | Display shard level report |

### Examples

```
# Verify TSM file integrity
influx_inspect verify -dir "C:\Program Files\Siemens\WinCC_OA\3.21\data\influxdb\data"

# Export data to line protocol
influx_inspect export -datadir "C:\...\data" -waldir "C:\...\wal" -out backup.lp

# Rebuild TSI index (after corruption)
influx_inspect buildtsi -datadir "C:\...\data" -waldir "C:\...\wal"
```

---

## NGA / InfluxDB Integration Notes

- The NGA InfluxDB instance is configured via WinCC OA project settings (NGA configuration DPs)
- Default NGA InfluxDB port: typically `8086`
- Database name: set in the NGA configuration
- When `WCCOAnextgenarch` is running, it manages the `influxd` process lifecycle
- Do not modify the InfluxDB data directory while WinCC OA is running
- For production use, prefer `WCCOAnextgenarch` commands over direct `influx` CLI access
