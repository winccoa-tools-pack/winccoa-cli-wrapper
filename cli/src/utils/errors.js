export class WcoaError extends Error {
  constructor(message, hint) {
    super(message);
    this.name = this.constructor.name;
    this.hint = hint ?? null;
  }
}

export class NoActiveVersionError extends WcoaError {
  constructor() {
    super(
      'No active WinCC OA version is set.',
      'Run `wcoa version add <ver> <binPath>` to register an installation, then `wcoa version use <ver>`.'
    );
  }
}

export class VersionNotRegisteredError extends WcoaError {
  constructor(version) {
    super(
      `Version "${version}" is not registered.`,
      'Run `wcoa version list` to see registered versions.'
    );
  }
}

export class BinaryNotFoundError extends WcoaError {
  constructor(binaryPath) {
    super(
      `Binary not found at: ${binaryPath}`,
      'Ensure the WinCC OA installation is complete and the registered binPath is correct.'
    );
  }
}

export class ExecutionError extends WcoaError {
  constructor(binaryPath, cause) {
    super(
      `Failed to execute: ${binaryPath} (${cause.code ?? cause.message})`,
      cause.code === 'EACCES'
        ? 'Check file permissions on the binary.'
        : 'Ensure the binary exists and is executable.'
    );
    this.cause = cause;
  }
}
