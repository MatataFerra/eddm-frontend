import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.API_SECRET;

export const generateToken = (payload: object) => {
  if (!SECRET_KEY) {
    throw new Error("JWT secret key not defined");
  }

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};
