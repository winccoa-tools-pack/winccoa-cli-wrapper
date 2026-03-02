import { Command } from 'commander';
import { resolveBinary } from '../core/resolver.js';
import { execute } from '../core/executor.js';

/**
 * Factory that creates a shortcut command forwarding to a WinCC OA binary.
 * @param {string} name - CLI command name (e.g. "pmon")
 * @param {string} binary - Target binary name (e.g. "WCCILpmon")
 * @param {string} description - Short description for --help
 */
export function makeShortcut(name, binary, description) {
  return new Command(name)
    .description(`${description} → ${binary}`)
    .argument('[args...]', `Arguments passed directly to ${binary}`)
    .option('--wcoa-version <ver>', 'Use a specific registered version for this invocation')
    .allowUnknownOption()
    .enablePositionalOptions()
    .passThroughOptions()
    .action((args, opts) => {
      const binaryPath = resolveBinary(binary, opts.wcoaVersion ?? null);
      execute(binaryPath, args);
    });
}

/** All shortcut definitions */
export const SHORTCUTS = [
  { name: 'pmon',      binary: 'WCCILpmon',              description: 'Process monitor' },
  { name: 'ascii',     binary: 'WCCOAascii',             description: 'ASCII manager' },
  { name: 'ctrl',      binary: 'WCCOActrl',              description: 'Control manager' },
  { name: 'data',      binary: 'WCCILdata',              description: 'Data manager' },
  { name: 'event',     binary: 'WCCILevent',             description: 'Event manager' },
  { name: 'dist',      binary: 'WCCILdist',              description: 'Distribution manager' },
  { name: 'redu',      binary: 'WCCILredu',              description: 'Redundancy manager' },
  { name: 'createdb',  binary: 'WCCOAtoolCreateDb',      description: 'Create database' },
  { name: 'repairdb',  binary: 'WCCOAtoolRepairDb',      description: 'Repair database' },
  { name: 'convertdb', binary: 'WCCOAtoolConvertDb',     description: 'Convert database' },
  { name: 'synctype',  binary: 'WCCOAtoolSyncTypes',     description: 'Sync types tool' },
  { name: 'cryptctrl', binary: 'WCCOAtoolCryptCtrl',     description: 'Crypt control tool' },
  { name: 'gethw',     binary: 'WCCILtoolGetHW',         description: 'Get hardware info' },
  { name: 'getlic',    binary: 'WCCOAtoolGetCMLicInfo',  description: 'Get license info' },
  { name: 'logview',   binary: 'WCCOAtoolLogViewer',     description: 'Log viewer' },
  { name: 'nametoid',  binary: 'WCCOAtoolNameToId',      description: 'Name-to-ID converter' },
];
