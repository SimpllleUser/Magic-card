export interface EntityApiFields {
  $id: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  $createdAt: string;
  $updatedAt: string;
}

export type EnitityAPI<T> = T & EntityApiFields

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
