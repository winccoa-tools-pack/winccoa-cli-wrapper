import { Command } from 'commander';
import { makeVersionCommand } from './commands/version.js';
import { makeRunCommand } from './commands/run.js';
import { makeConfigCommand } from './commands/config.js';
import { makeShortcut, SHORTCUTS } from './commands/shortcuts.js';
import { makeDpCommand } from './commands/dp.js';

export function createProgram() {
  const program = new Command();

  program
    .name('wcoa')
    .description('WinCC OA CLI wrapper — manage installations and run tools')
    .version('1.0.0')
    .enablePositionalOptions();

  program.addCommand(makeVersionCommand());
  program.addCommand(makeRunCommand());
  program.addCommand(makeConfigCommand());
  program.addCommand(makeDpCommand());

  for (const { name, binary, description } of SHORTCUTS) {
    program.addCommand(makeShortcut(name, binary, description));
  }

  return program;
}
