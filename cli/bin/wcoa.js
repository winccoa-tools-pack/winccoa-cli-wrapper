#!/usr/bin/env node
import { createProgram } from '../src/cli.js';
import chalk from 'chalk';
import { WcoaError } from '../src/utils/errors.js';

const program = createProgram();

try {
  await program.parseAsync(process.argv);
} catch (err) {
  if (err instanceof WcoaError) {
    console.error(chalk.red(`Error: ${err.message}`));
    if (err.hint) {
      console.error(chalk.yellow(`Hint: ${err.hint}`));
    }
  } else {
    console.error(chalk.red(`Unexpected error: ${err.message}`));
    if (process.env.DEBUG) {
      console.error(err.stack);
    }
  }
  process.exit(1);
}
