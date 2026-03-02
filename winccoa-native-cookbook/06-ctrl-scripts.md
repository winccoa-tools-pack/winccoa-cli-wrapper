# CTRL Scripts

## Run a project script

```
WCCOActrl -proj MyProject -log +stderr scripts/maintenance.ctl
```

## Run a script with arguments

```
WCCOActrl -proj MyProject -log +stderr scripts/export.ctl outputDir 2024-01-01
```

## Syntax-check a script without running it

```
WCCOActrl -proj MyProject -syntax scripts/myScript.ctl
```

## Run multiple scripts from a list file

```
WCCOActrl -proj MyProject -f scripts/batchJobs.txt
```

## Enable debug output

```
WCCOActrl -proj MyProject -log +stderr -dbg 2 scripts/test.ctl
```

## Encrypt a CTRL script

```
WCCOAtoolCryptCtrl scripts\secret.ctl
# Creates: scripts\secret.ctc  (binary, not human-readable)
```

## Run an encrypted script

```
WCCOActrl -proj MyProject -log +stderr scripts/secret.ctc
```
