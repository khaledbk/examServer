import { ObjectId } from "mongodb";

export enum Provider {
  PASSWORD = "password",
  GOOGLE = "google",
  TOKEN = "token",
}
export interface LoginProviderInterface {
  provider: Provider;
  data: string;
}
export interface LoginInterface {
  username: string;
  provider: LoginProviderInterface;
}

export interface CredentialsInterface {
  hash: string;
  isAdmin: boolean;
  loginToken: string;
  lastLogin: Date;
  googleToken: string;
}

export interface UserInterface {
  _id: ObjectId;
  username: string;
  email: string;
  credentials: CredentialsInterface;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  title: string;
}

export const User = (
  username: string,
  email: string,
  credentials: CredentialsInterface,
  name: string,
  surname: string,
  phoneNumber: string,
  address: string,
  title: string
) => {
  return {
    _id: new ObjectId(), // mongo objectId
    username,
    email,
    credentials,
    name,
    surname,
    phoneNumber,
    address,
    title,
    createdAt: new Date(),
  };
};
