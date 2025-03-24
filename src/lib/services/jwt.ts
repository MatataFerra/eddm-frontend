import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.API_SECRET;

export const generateToken = (payload: object) => {
  if (!SECRET_KEY) {
    throw new Error("JWT secret key not defined");
  }

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  if (!SECRET_KEY) {
    throw new Error("Error while verifying token");
  }

  try {
    return jwt.verify(token, SECRET_KEY);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new Error("Invalid token");
  }
};
