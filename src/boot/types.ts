export type NumberOrString = number | string;
export type CallbackFunction<Args = any, Return = any> = (...args: Args[]) => Return;

export type EntityUnform<T> = T & { id?: string };
export type EntityBase<T> = T & { id: string };
