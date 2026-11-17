import pkg from '../../package.json';

/**
 * Single source of truth for platform version and storage/export schema metadata.
 * Derived directly from package.json to prevent version drift in UI and exports.
 */
export const APP_NAME: string = pkg.name;
export const APP_VERSION: string = pkg.version;
export const PROGRESS_SCHEMA_VERSION = 2 as const;
export const PROGRESS_EXPORT_VERSION = 2 as const;
