export interface IUser {
  id?: string;
  email: string;
  name: string;
  picture: string;
  givenName: string;
  familyName: string;
  emailVerified: boolean;
}

export interface IUserInfoResponse {
  sub: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
}
