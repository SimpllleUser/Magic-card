export type NumberOrString = number | string;
export type CallbackFunction<Args = any, Return = any> = (...args: Args[]) => Return;
