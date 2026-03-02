import { Command } from 'commander';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { resolveBinary } from '../core/resolver.js';
import { executeCapture } from '../core/executor.js';

const BRIDGE_SCRIPT = 'wcoa_bridge.ctl';

function bridgeSrcPath() {
  return fileURLToPath(new URL('../scripts/wcoa_bridge.ctl', import.meta.url));
}

function installBridge(projPath) {
  const scriptsDir = join(projPath, 'scripts');
  const dest = join(scriptsDir, BRIDGE_SCRIPT);

  if (existsSync(dest)) {
    console.log(chalk.gray('Bridge script already installed.'));
    return;
  }

  mkdirSync(scriptsDir, { recursive: true });
  copyFileSync(bridgeSrcPath(), dest);
  console.log(chalk.green(`Bridge script installed at: ${dest}`));
}

export function makeDpCommand() {
  const cmd = new Command('dp').description(
    'Read and write datapoint values via WCCOActrl bridge script'
  );

  cmd
    .command('install')
    .description('Copy the wcoa_bridge.ctl script into the project scripts/ directory')
    .requiredOption('--proj <name>', 'WinCC OA project name')
    .requiredOption('--proj-path <dir>', 'Absolute path to the WinCC OA project root')
    .action((opts) => {
      if (!existsSync(opts.projPath)) {
        console.error(chalk.red(`Project path not found: ${opts.projPath}`));
        process.exit(1);
      }
      installBridge(opts.projPath);
    });

  cmd
    .command('get <dp>')
    .description('Read a datapoint value (project must be running)')
    .requiredOption('--proj <name>', 'WinCC OA project name')
    .option('--proj-path <dir>', 'Project root — auto-installs bridge if missing')
    .option('--wcoa-version <ver>', 'WinCC OA version override')
    .action((dp, opts) => {
      if (opts.projPath) {
        if (!existsSync(opts.projPath)) {
          console.error(chalk.red(`Project path not found: ${opts.projPath}`));
          process.exit(1);
        }
        installBridge(opts.projPath);
      }

      const wcoactrl = resolveBinary('WCCOActrl', opts.wcoaVersion ?? null);
      const args = ['-proj', opts.proj, BRIDGE_SCRIPT, 'get', dp];
      const { stdout, stderr, status } = executeCapture(wcoactrl, args);

      if (status !== 0) {
        if (stderr.trim()) console.error(stderr.trim());
        process.exit(status);
      }
      console.log(stdout.trim());
    });

  cmd
    .command('set <dp> <value>')
    .description('Write a datapoint value (project must be running)')
    .requiredOption('--proj <name>', 'WinCC OA project name')
    .option('--proj-path <dir>', 'Project root — auto-installs bridge if missing')
    .option('--wcoa-version <ver>', 'WinCC OA version override')
    .action((dp, value, opts) => {
      if (opts.projPath) {
        if (!existsSync(opts.projPath)) {
          console.error(chalk.red(`Project path not found: ${opts.projPath}`));
          process.exit(1);
        }
        installBridge(opts.projPath);
      }

      const wcoactrl = resolveBinary('WCCOActrl', opts.wcoaVersion ?? null);
      const args = ['-proj', opts.proj, BRIDGE_SCRIPT, 'set', dp, value];
      const { stdout, stderr, status } = executeCapture(wcoactrl, args);

      if (status !== 0) {
        if (stderr.trim()) console.error(stderr.trim());
        process.exit(status);
      }
      console.log(stdout.trim());
    });

  return cmd;
}
