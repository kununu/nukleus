export const isBrowser = typeof window !== 'undefined';
export const executionEnv = isBrowser ? 'browser' : 'server';
