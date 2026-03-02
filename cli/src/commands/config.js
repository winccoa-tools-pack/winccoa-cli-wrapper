import { Command } from 'commander';
import chalk from 'chalk';
import { getConfig, getConfigPath } from '../core/config.js';

export function makeConfigCommand() {
  const cmd = new Command('config').description('Manage wcoa configuration');

  cmd
    .command('show')
    .description('Print config file path and current configuration')
    .action(() => {
      const configPath = getConfigPath();
      const config = getConfig();

      console.log(chalk.bold('Config file:'), configPath);
      console.log();
      console.log(JSON.stringify(config, null, 2));
    });

  return cmd;
}
