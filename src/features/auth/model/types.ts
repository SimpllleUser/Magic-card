
export interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  registration: string;
  status: boolean;
  labels: any[];
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  mfa: boolean;
  prefs: Prefs;
  targets: Target[];
  accessedAt: string;
}

export interface Prefs {}

export interface Target {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  userId: string;
  providerId: any;
  providerType: string;
  identifier: string;
  expired: boolean;
}

export interface AuthUser extends User {
  $id: string;
}
