export type EnitityAPI<T> = T & {
  $id: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  $createdAt: string;
  $updatedAt: string;
};

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
