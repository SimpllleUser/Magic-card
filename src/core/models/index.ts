export type Entity<T> = { id: string } & T;
export type WithoutId<T> = Pick<T, 'id'>;
