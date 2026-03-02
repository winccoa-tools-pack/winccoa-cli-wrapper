export const IS_WINDOWS = process.platform === 'win32';

/**
 * Returns the platform-appropriate binary filename.
 * @param {string} name - Base binary name, e.g. "WCCILpmon"
 * @returns {string}
 */
export function binaryName(name) {
  return IS_WINDOWS ? `${name}.exe` : name;
}

/**
 * Returns default OS paths to scan for WinCC OA installations.
 * @returns {string[]}
 */
export function defaultScanPaths() {
  if (IS_WINDOWS) {
    const base = process.env['ProgramFiles'] ?? 'C:\\Program Files';
    return [`${base}\\Siemens\\WinCC_OA`];
  }
  return ['/opt/WinCC_OA'];
}
