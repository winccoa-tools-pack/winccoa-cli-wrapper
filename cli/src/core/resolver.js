import { existsSync } from 'fs';
import { join } from 'path';
import { getConfig } from './config.js';
import { binaryName } from '../utils/platform.js';
import {
  NoActiveVersionError,
  VersionNotRegisteredError,
  BinaryNotFoundError,
} from '../utils/errors.js';

/**
 * Resolves the full path to a WinCC OA binary.
 * @param {string} binary - Base binary name, e.g. "WCCILpmon"
 * @param {string|null} [versionOverride] - Optional version override
 * @returns {string} Absolute path to the binary
 */
export function resolveBinary(binary, versionOverride = null) {
  const config = getConfig();
  const version = versionOverride ?? config.activeVersion;

  if (!version) {
    throw new NoActiveVersionError();
  }

  const entry = config.versions[version];
  if (!entry) {
    throw new VersionNotRegisteredError(version);
  }

  const fullPath = join(entry.binPath, binaryName(binary));

  if (!existsSync(fullPath)) {
    throw new BinaryNotFoundError(fullPath);
  }

  return fullPath;
}
