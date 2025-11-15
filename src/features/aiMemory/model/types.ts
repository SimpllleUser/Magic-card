enum Role {
  User = 'user',
  Model = 'model'
}

type IParts = Array<{
  text: string;
}>;

export interface IHistory {
  role: Role;
  parts: IParts;
}
