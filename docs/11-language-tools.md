# Language & Translation Tools

WinCC OA supports multiple languages for panels, catalogs, and datapoint descriptions. These tools manage translations.

---

## WCCOAtoolLang — Remove Language from Panel

Removes a specific language from a panel file.

### Usage

```
WCCOAtoolLang -proj <name> -rem -lang <langid> -file <panel-file> [-log +stderr]
```

### Flags

| Flag | Description |
|------|-------------|
| `-proj <name>` | Project name |
| `-rem` / `-remove` | Remove the language |
| `-lang <langid>` | Language ID to remove (e.g., `en_US.utf8`, `de_AT.iso88591`) |
| `-file <panel-file>` | Panel file to modify |
| `-logE` | Log error messages |
| `-logP` | Log progress |
| `-log +stderr` | Print messages to console |

### Example

```
# Remove German language from a panel
WCCOAtoolLang -proj MyProject -rem -lang de_AT.iso88591 -file panels/overview.pnl -log +stderr
```

---

## WCCOAtoolParse — Parse Files and Build Translation Dictionary

Reads project files and generates a translation dictionary for use with `WCCOAtoolTrans`.

### Usage

```
WCCOAtoolParse -dictIN <input-dict> -dictOUT <output-dict> -html <html-dict>
               -langid <refLangID>[,<destLangID>...]
               [-noRef] [-overwrite] [-multitrans] [-noChange]
               -config <config-file>
               <file-scope-flags> <log-flags>
               [-files <file>[,<file>...]]
```

### File Scope Flags (choose which files to scan)

| Flag | Scope |
|------|-------|
| `-vA` | All catalogs and panels from the WinCC OA installation version |
| `-vC` | Only catalogs from the WinCC OA version |
| `-vP` | Only panels from the WinCC OA version |
| `-pA` | All catalogs, panels, and datapoints from the project |
| `-pC` | Only catalogs from the project |
| `-pP` | Only panels from the project |
| `-pD` | Only datapoints from the project |

### Log Flags

| Flag | Verbosity |
|------|-----------|
| `-logF` | Fatal errors only |
| `-logE` | Errors |
| `-logW` | Warnings |
| `-logP` | Progress (file level) |
| `-logS` | Steps (word level) |
| `-logV` | Verbose |

### Other Flags

| Flag | Description |
|------|-------------|
| `-dictIN <dict>` | Existing dictionary to use as input |
| `-dictOUT <dict>` | Output dictionary file to create |
| `-html <dict>` | HTML dictionary file |
| `-langid <refLang>[,destLang...]` | Language IDs; first is reference language |
| `-noRef` | Do not use reference language |
| `-files <file>[,file...]` | Specific files to parse |
| `-overwrite` | Last entry wins (overwrite older entries) |
| `-multitrans` | Save separate translations for different panels/catalogs |
| `-noChange` | Do not modify the dictionary (read-only check) |
| `-config <file>` | Override PVSS_II env variable |

### Example

```
# Parse all project panels for English and German
WCCOAtoolParse \
  -dictIN D:\dict\existing.dict \
  -dictOUT D:\dict\updated.dict \
  -langid en_US.utf8,de_AT.iso88591 \
  -pA \
  -logP \
  -config D:\projects\MyProject\config\config
```

---

## WCCOAtoolTrans — Apply Translations

Applies translations from a dictionary to project files. Requires a running project.

### Usage

```
WCCOAtoolTrans -proj <name> [options]
```

Requires project context (PVSS_II or `-proj`). Run with `-help` on a live system for full options.

---

## Language IDs

Common WinCC OA language IDs:

| Language | ID |
|----------|-----|
| English (US) | `en_US.utf8` |
| German (Austria) | `de_AT.iso88591` |
| German (Germany) | `de_DE.utf8` |
| French | `fr_FR.utf8` |
| Simplified Chinese | `zh_CN.utf8` |
| POSIX (neutral) | `posix` |

The language ID format is `<language>_<country>.<encoding>`.
