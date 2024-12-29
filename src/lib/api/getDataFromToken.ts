import jwt from "jsonwebtoken";

export const getDataFromToken = (token: string) => {
  const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
  return decodedToken.id;
};
