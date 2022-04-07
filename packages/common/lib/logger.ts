type LogFn = (...args: Array<string | number>) => void
export type Logger = { warn: LogFn; info: LogFn; error: LogFn }
