import jwt from "jsonwebtoken";
const SECRET = "!T0p4Ecret";

type JWTPayload = {
  _id: string;
  email: string;
};

export const signJwt = ({ _id, email }: JWTPayload) => {
  return jwt.sign({ _id, email }, SECRET, {
    expiresIn: 60 * 48, // test 86400 // expires in 24 hours
  });
};

export const decode = (token: string) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token);

    return decoded;
  } catch (error) {
    console.error(`error`, error);
    return null;
  }
};
