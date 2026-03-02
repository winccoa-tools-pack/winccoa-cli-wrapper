import { spawnSync } from 'child_process';
import { ExecutionError } from '../utils/errors.js';

/**
 * Executes a binary with the given arguments, inheriting stdio.
 * Mirrors the child process exit code exactly.
 * @param {string} binaryPath - Absolute path to the binary
 * @param {string[]} args - Arguments to pass to the binary
 */
export function execute(binaryPath, args) {
  const result = spawnSync(binaryPath, args, {
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    throw new ExecutionError(binaryPath, result.error);
  }

  process.exit(result.status ?? 1);
}

/**
 * Executes a binary and captures its stdout/stderr.
 * @param {string} binaryPath - Absolute path to the binary
 * @param {string[]} args - Arguments to pass to the binary
 * @returns {{ stdout: string, stderr: string, status: number }}
 */
export function executeCapture(binaryPath, args) {
  const result = spawnSync(binaryPath, args, {
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: false,
    encoding: 'utf8',
  });
  if (result.error) throw new ExecutionError(binaryPath, result.error);
  return { stdout: result.stdout ?? '', stderr: result.stderr ?? '', status: result.status ?? 1 };
}
