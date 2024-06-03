import { IUser } from "./userTypes";


export type Token = {
  access_token: string;
  refresh_token: string;
};

export type TokenWithData = {
  tokens: Token;
  user: IUser;
};
