export type EntityWithId<T> = { id: string } & T;
export type OptionalId<T> = T & { id?: string };
