import crypto from "crypto";

export const SALT = "t0p$Ecret!";

export const hashedPassword = (password: string) => {
  return crypto.pbkdf2Sync(password, SALT, 1000, 256, `sha512`).toString(`hex`);
};
