import { Command } from 'commander';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';
import {
  getConfig,
  addVersion,
  removeVersion,
  setActiveVersion,
} from '../core/config.js';
import { defaultScanPaths, binaryName } from '../utils/platform.js';
import { VersionNotRegisteredError } from '../utils/errors.js';

export function makeVersionCommand() {
  const cmd = new Command('version').description(
    'Manage WinCC OA installation registrations'
  );

  cmd
    .command('add <ver> <binPath>')
    .description('Register a WinCC OA installation')
    .action((ver, binPath) => {
      addVersion(ver, binPath);
      console.log(chalk.green(`Registered version ${ver} at: ${binPath}`));

      const config = getConfig();
      if (!config.activeVersion) {
        setActiveVersion(ver);
        console.log(chalk.cyan(`Set ${ver} as the active version.`));
      }
    });

  cmd
    .command('remove <ver>')
    .description('Unregister a WinCC OA version')
    .action((ver) => {
      const config = getConfig();
      if (!config.versions[ver]) {
        throw new VersionNotRegisteredError(ver);
      }
      removeVersion(ver);
      console.log(chalk.yellow(`Removed version ${ver}.`));
    });

  cmd
    .command('list')
    .description('List all registered versions (* = active)')
    .action(() => {
      const config = getConfig();
      const versions = Object.keys(config.versions);

      if (versions.length === 0) {
        console.log('No versions registered. Use `wcoa version add <ver> <binPath>`.');
        return;
      }

      for (const ver of versions) {
        const entry = config.versions[ver];
        const active = ver === config.activeVersion;
        const marker = active ? chalk.green('* ') : '  ';
        console.log(`${marker}${chalk.bold(ver)} — ${entry.binPath}`);
      }
    });

  cmd
    .command('use <ver>')
    .description('Set the active WinCC OA version')
    .action((ver) => {
      const config = getConfig();
      if (!config.versions[ver]) {
        throw new VersionNotRegisteredError(ver);
      }
      setActiveVersion(ver);
      console.log(chalk.green(`Active version set to ${ver}.`));
    });

  cmd
    .command('detect')
    .description('Auto-scan default OS paths for WinCC OA installations')
    .action(() => {
      const scanPaths = defaultScanPaths();
      let found = 0;

      for (const basePath of scanPaths) {
        if (!existsSync(basePath)) {
          console.log(chalk.gray(`Scan path not found: ${basePath}`));
          continue;
        }

        let entries;
        try {
          entries = readdirSync(basePath, { withFileTypes: true });
        } catch {
          console.log(chalk.gray(`Cannot read: ${basePath}`));
          continue;
        }

        for (const entry of entries) {
          if (!entry.isDirectory()) continue;
          if (!/^\d+\.\d+$/.test(entry.name)) continue;

          const binPath = join(basePath, entry.name, 'bin');
          const probe = join(binPath, binaryName('WCCILpmon'));

          if (existsSync(probe)) {
            addVersion(entry.name, binPath);
            console.log(chalk.green(`Detected and registered: ${entry.name} → ${binPath}`));
            found++;
          }
        }
      }

      if (found === 0) {
        console.log('No WinCC OA installations detected in default paths.');
        for (const p of scanPaths) {
          console.log(chalk.gray(`  Scanned: ${p}`));
        }
      } else {
        const config = getConfig();
        if (!config.activeVersion) {
          const firstDetected = Object.keys(config.versions)[0];
          setActiveVersion(firstDetected);
          console.log(chalk.cyan(`Set ${firstDetected} as the active version.`));
        }
      }
    });

  return cmd;
}
