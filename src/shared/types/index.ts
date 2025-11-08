export interface EntityApiFields {
  $id: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  $createdAt: string;
  $updatedAt: string;
}

export type EntityAPI<T> = T & EntityApiFields;

interface ErrorResponse {
  message: string;
  code: number;
  type: string;
  version: string;
}

export type ErrorEntityAPi = {
  name: string;
  code: number;
  type: string;
  response: ErrorResponse;
};

export type ReplaceField<T, K extends keyof T, NewType> = {
  [P in keyof T]: P extends K ? NewType : T[P];
};

export type RemoveFields<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

export interface EmitEvents<T extends Record<string, unknown>> {
  <K extends keyof T>(event: K, payload: T[K]): void;
}
