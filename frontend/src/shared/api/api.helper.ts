import Cookies from "js-cookie";
import { Token, TokenWithData } from "@shared/types/tokenTypes";
import { IAuthResponse } from "@shared/types/authType";

export const getContentType = () => ({
  "Content-Type": "application/json",
});

// export const errorCatch = (error: any): string => {
//   const message = error?.response?.data?.message;

//   return message
//     ? typeof error.response.data.message === "object"
//       ? message[0]
//       : message
//     : error.message;
// };

const saveTokenStorage = (data: Token) => {
  Cookies.set("access_token", data.access_token);
  Cookies.set("refresh_token", data.refresh_token);

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
};

export const removeTokenStorage = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  localStorage.removeItem('user');
};

export const saveToStorage = (data: TokenWithData) => {
  saveTokenStorage(data.tokens);
  data.user ? localStorage.setItem("user", JSON.stringify(data.user)) : null;
};
