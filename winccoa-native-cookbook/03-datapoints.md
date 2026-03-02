# Reading and Writing Datapoints

## Read a single datapoint value

```
WCCOAascii -proj MyProject -get Pump1.Speed -log +stderr
```

## Read with local timezone

```
WCCOAascii -proj MyProject -get Pump1.LastUpdate -localTime -log +stderr
```

## Write a single datapoint value

```
# Numeric
WCCOAascii -proj MyProject -set Pump1.Speed 42.5

# Boolean
WCCOAascii -proj MyProject -set MotorControl.Start TRUE

# String
WCCOAascii -proj MyProject -set Tank1.Label "Main Tank"
```

## Debug message traffic while reading/writing

```
WCCOAascii -proj MyProject -snd 1 -rcv 1 -get Pump1.Speed -log +stderr
```

## Read/write via CTRL bridge script (requires running project)

```
# Install the bridge script once:
WCCOActrl -proj MyProject scripts/wcoa_bridge.ctl install

# Read:
WCCOActrl -proj MyProject wcoa_bridge.ctl get Pump1.Speed

# Write:
WCCOActrl -proj MyProject wcoa_bridge.ctl set Pump1.Speed 42.5
```
