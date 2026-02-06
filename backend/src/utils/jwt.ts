import jwt, {type JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
}

// Ensure secret exists
const jwtSecret = process.env.JWT_SECRET as any;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// Generate Token
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, "Sharma_Secure_Key", {
    expiresIn: "1d",
  });
}

// Verify Token
export function verifyToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, "Sharma_Secure_Key") as DefaultJwtPayload & JwtPayload;
    // console.log(`decoded ::${decoded}`)
    return {
      id: decoded.id,
      email: decoded.email,
    };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}


// import jwt from 'jsonwebtoken'
// interface JwtPayload {
//   id: number
//   email: string
// }
// const jwtSecret=process.env.JWT_SECRET as string;

// function generateToken(userPayload: JwtPayload): string{

//     const token_generated = jwt.sign(userPayload, jwtSecret, { expiresIn: "1d"})
//     return token_generated;
// }
// function verifyToken(token: string):any {


//     const verified_token = jwt.verify(token,jwtSecret)
//     return verified_token

// }
// export { generateToken, verifyToken }

// import jwt  from "jsonwebtoken";
// import  type {  JwtPayload, Secret, SignOptions } from "jsonwebtoken";
// import { JWT_SECRET, JWT_EXPIRES_IN } from "./../../env";

// interface TokenPayload {
//   userId: number;
// }

// function generateToken(payload: TokenPayload): string {
//   const options: SignOptions = {
//     expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
//   };

//   return jwt.sign(
//     payload,
//     JWT_SECRET as Secret,
//     options
//   );
// }

// function verifyToken(token: string): JwtPayload & TokenPayload {
//   return jwt.verify(
//     token,
//     JWT_SECRET as Secret
//   ) as JwtPayload & TokenPayload;
// }

// export { generateToken, verifyToken };



