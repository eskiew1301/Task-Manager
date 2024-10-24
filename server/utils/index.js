import jwt  from "jsonwebtoken";
import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const mongoUri = process.env.MONGO_URI; 

    await mongoose.connect(mongoUri);
    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export default dbConnection;


export const createJWT=(res, userId)=>{
  const token=jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "30d"})
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV ==="production",
    sameSite:"strict",//prevent CSRF attacks

    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
}