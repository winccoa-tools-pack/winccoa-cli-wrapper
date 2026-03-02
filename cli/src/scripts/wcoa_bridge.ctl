// WCoA CLI Bridge Script — managed by wcoa, do not edit manually
// Invocation: WCCOActrl -proj <name> wcoa_bridge.ctl <get|set> <dp> [value]
// userArgs are 1-indexed in WinCC OA CTRL

void main(string userArgs[])
{
  if (dynlen(userArgs) < 2) {
    print("ERROR: usage: wcoa_bridge.ctl <get|set> <dp> [value]");
    exit(1);
  }

  string op = userArgs[1];
  string dp = userArgs[2];

  if (op == "get") {
    anytype val;
    int rc = dpGet(dp, val);
    if (rc != 0) {
      print("ERROR: dpGet failed for \"" + dp + "\" (rc=" + rc + ")");
      exit(1);
    }
    print(val);
    exit(0);

  } else if (op == "set") {
    if (dynlen(userArgs) < 3) {
      print("ERROR: set requires a value argument");
      exit(1);
    }
    int rc = dpSet(dp, userArgs[3]);
    if (rc != 0) {
      print("ERROR: dpSet failed for \"" + dp + "\" (rc=" + rc + ")");
      exit(1);
    }
    print("OK");
    exit(0);

  } else {
    print("ERROR: unknown operation \"" + op + "\" (expected get or set)");
    exit(1);
  }
}
