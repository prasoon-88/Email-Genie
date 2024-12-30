import jwt from "jsonwebtoken";
import { getHasedToken } from "..";
import User from "@/models/user.model";
import { sendEmail } from "../mailer";
import { TOKEN_KEY } from "@/config";

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getDataFromToken = async (token: string) => {
  const payload: any = verifyToken(token);
  if (!payload?.id) {
    return null;
  }
  const user = await User.findById(payload?.id).select("-password");
  return user;
};

export const sendVerificationEmail = async (userId: string) => {
  try {
    const verifyToken = await getHasedToken(userId.toString());
    const verifyTokenExpiry = Date.now() + 3600000;
    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        verifyToken,
        verifyTokenExpiry,
      },
    });
    if (!user) {
      return false;
    }
    const { email } = user;
    await sendEmail({
      to: email,
      subject: "User Sign up success",
      text: `Verify using ${process.env.NEXT_PUBLIC_API_URL}verify?${TOKEN_KEY}=${verifyToken}`,
    });
    console.log("An Verification Email has been sent to ", email);
    return true;
  } catch (error) {
    console.log("Error while sending verification email");
  }
  return false;
};
