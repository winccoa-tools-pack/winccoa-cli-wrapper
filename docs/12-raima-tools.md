# Raima Database Tools

Low-level tools for the Raima RDM (Raima Database Manager) 4.5 embedded database used by WinCC OA. These operate directly on the binary database files — **use with caution** and only when the project is stopped.

All tools use Raima's `dbname` identifier (the database base name/directory, not the `.db` file extension).

---

## datdump — Data File Dump

Dumps the raw contents of a Raima data file in hex and/or formatted text.

### Usage

```
datdump [-x] [-f] [-h] [-rN] [-cfieldName{=,<,>}value] dbname filename
datdump dbname    # list available data files
```

### Flags

| Flag | Description |
|------|-------------|
| `-x` | Hex output only (no formatted output) |
| `-f` | Formatted output only (no hex) |
| `-h` | Header info only (no field data) |
| `-rN` | Print only record at slot N |
| `-cfieldName{=,<,>}value` | Print only records matching condition |
| *(no filename)* | List all data files in the database |

### Example

```
datdump -f D:\projects\MyProject\db dbname.dp
```

---

## dbexp — Database Export

Exports Raima database records to CSV-like text format.

### Usage

```
dbexp [-r] [-m] [-n] [-d] [-e esc] [-s sep] [-x] dbname [rectypes...]
```

### Flags

| Flag | Description |
|------|-------------|
| `-r` | Print record's database as a field |
| `-m` | Print owner database addresses as fields |
| `-n` | Silent mode (no output to stdout) |
| `-d` | Print database addresses in decimal (default: file:slot) |
| `-e <char>` | Alternate escape character (default: `\`) |
| `-s <char>` | Alternate separator character (default: `,`) |
| `-x` | Print extended ASCII characters (default: octal) |
| `rectypes...` | Specific record types to export (optional) |

### Example

```
dbexp D:\projects\MyProject\db > D:\backup\db_export.csv
```

---

## dbimp — Database Import

Imports data from a `dbexp`-generated file back into a Raima database.

### Usage

```
dbimp [-n] [-pN] [-kN] [-e esc] [-s sep] file
```

### Flags

| Flag | Description |
|------|-------------|
| `-n` | No output (silent) |
| `-pN` | Number of pages in cache |
| `-kN` | Adjust 'create on' field length to N (default: 25) |
| `-e <char>` | Alternate escape character (default: `\`) |
| `-s <char>` | Alternate separator character (default: `,`) |

### Example

```
dbimp D:\backup\db_export.csv
```

---

## dbcheck — Database Consistency Check

Checks the integrity of a Raima database. Run before and after repairs.

### Usage

```
dbcheck [-options] dbname [dbfiles...]
```

### Flags

| Flag | Description |
|------|-------------|
| `-s` | Complete set consistency check |
| `-k` | Key file structure check |
| `-dk` | Key access check (data → key files) |
| `-kd` | Key data check (key → data files) |
| `-a` | All of `-s -dk -kd -ts` |
| `-nk` | Disable key checks; ignore key files |
| `-ts` | Timestamp checks for records and sets |
| `-r#` | Report every N percent to stderr |
| `-p#` | Max pages for page cache |
| `-f#` | Max open files allowed |
| `-t` | Print B-tree traceback on first disorder |
| `-c` | Print counts of objects scanned |

### Example

```
# Full consistency check
dbcheck -a D:\projects\MyProject\db

# Quick key check with progress reporting
dbcheck -k -r 10 D:\projects\MyProject\db
```

---

## dbrev — Database Restructure

Restructures/migrates a Raima database schema. Used when the database definition (RDL file) changes.

### Usage

```
dbrev [options] old_db new_db
```

### Flags

| Flag | Description |
|------|-------------|
| `-s <RDL_FILE>` | RDL (Raima Definition Language) file with new schema |
| `-e "RDL_string(s)"` | Inline RDL string (semicolon-separated) |
| `-p#` | Cache size in pages (default: 48) |
| `-r` | Create report file `old_db.REP` |
| `-d` | Stop after compilation phase |
| `-q` | Quick mode (keeps deleted records) |
| `-v` | Verbose mode |
| `-i` | Enable Ctrl-C quit |
| `-c0\|1` | Print (1) or suppress (0) compile phase warnings |
| `-x0\|1` | Print (1) or suppress (0) execute phase warnings |
| `-a0\|1` | Abort (1) or continue (0) on warnings |

### Example

```
dbrev -rvi -p101 -s schema.rdl D:\old_db D:\new_db
```

---

## dchain — Delete Chain Sort

Sorts the delete chain of a Raima data file. Improves performance after many deletions.

### Usage

```
dchain dbname [filename ...]
```

---

## keybuild — Key File Build

Rebuilds key (index) files for a Raima database. Use when key files are corrupted or missing.

### Usage

```
keybuild [-p#] [-v] dbname
```

| Flag | Description |
|------|-------------|
| `-p#` | Cache size in pages |
| `-v` | Verbose mode |

### Example

```
keybuild D:\projects\MyProject\db
```

---

## keypack — Key File Packing

Packs (defragments) Raima key files for better performance.

### Usage

```
keypack [OPTIONS] dbname [keyfile]
```

### Flags

| Flag | Description |
|------|-------------|
| `-o` | Open in one-user mode (default) |
| `-x` | Open in exclusive mode |
| `-b <dir>` | Backup key files to this directory |
| `-k <dir>` | Store packed file in dir, keep original |
| `-t <dir>` | Store packed file in dir, replace original |
| `-p#` | Pages in RDM cache (default: 17) |
| `-u#` | Unused slots per page (default: 1) |
| `-mX` | Lock manager type: `n`=none, `g`, `i`, `b`, `s`, `t` |

Note: Directory paths must NOT end with `\`.

### Example

```
keypack -t D:\packed D:\projects\MyProject\db
```

---

## prdbd — Print Database Dictionary

Prints the Raima database dictionary (schema information).

### Usage

```
prdbd [-c] dbname
```

| Flag | Description |
|------|-------------|
| `-c` | Print with context information |

### Example

```
prdbd D:\projects\MyProject\db
```

---

## initdb — Initialize Database

Initializes (creates) a new empty Raima database.

### Usage

```
initdb [-y] dbname ...
```

| Flag | Description |
|------|-------------|
| `-y` | Skip confirmation prompt |

---

## Safety Rules for Raima Tools

1. **Stop the project first** — Never run Raima tools on a running database
2. **Back up before modifying** — Use `dbexp` to export before `dbimp`, or copy the `db/` directory
3. **These are low-level tools** — Prefer `WCCOAtoolRepairDb` for most repair tasks
4. **Log directory** — These tools do not write to WinCC OA logs; output goes to stdout/stderr
