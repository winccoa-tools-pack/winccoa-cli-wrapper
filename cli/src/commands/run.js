import { Command } from 'commander';
import { resolveBinary } from '../core/resolver.js';
import { execute } from '../core/executor.js';

export function makeRunCommand() {
  return new Command('run')
    .description('Run any WinCC OA binary by name with full argument passthrough')
    .argument('<binary>', 'Binary name (e.g. WCCILpmon)')
    .argument('[args...]', 'Arguments passed directly to the binary')
    .option('--wcoa-version <ver>', 'Use a specific registered version for this invocation')
    .allowUnknownOption()
    .enablePositionalOptions()
    .passThroughOptions()
    .action((binary, args, opts) => {
      const binaryPath = resolveBinary(binary, opts.wcoaVersion ?? null);
      execute(binaryPath, args);
    });
}
