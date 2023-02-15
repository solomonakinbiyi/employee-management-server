import bcrypt from "bcrypt";
import { expressjwt } from "express-jwt";

export const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (error, hashed) => {
        if (error) {
          reject(error);
        }
        resolve(hashed);
      });
    });
  });
};

export const comparePassword = (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};

export const requireSignIn = expressjwt({
  secret: `${process.env.JWT_SECRET!}`,
  algorithms: ["HS256"],
});
