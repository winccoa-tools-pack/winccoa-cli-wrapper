# Data Import

## Import a file (auto-confirm all changes)

```
WCCOAascii -proj MyProject -yes -in D:\backup\export.dpl
```

## Import all .dpl files from a directory

```
WCCOAascii -proj MyProject -yes -in "D:\backup\*.dpl"
```

## Import without changing existing DP types

```
WCCOAascii -proj MyProject -no -in D:\backup\export.dpl
```

## Import only types (deny type changes)

```
WCCOAascii -proj MyProject -Typesyes -in D:\backup\types.dpl
```

## Import while deactivating alerts

```
WCCOAascii -proj MyProject -yes -inactivateAlert -in D:\backup\export.dpl
```

## Import with progress output suppressed

```
WCCOAascii -proj MyProject -yes -noVerbose -in D:\backup\export.dpl
```

## Confirmation flags

| Flag | Behaviour |
|------|-----------|
| `-yes` | Accept all changes automatically |
| `-no` | Reject all conflicting changes |
| `-Typesyes` | Accept type imports, reject everything else |
| `-inactivateAlert` | Disable alert handling during import |
| `-noVerbose` | Suppress progress messages |
