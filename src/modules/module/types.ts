export interface IWordCard {
  id: string;
  from: string;
  to: string;
}

export interface IModule {
  id: string;
  name: string;
  word: Array<IWordCard>;
}
