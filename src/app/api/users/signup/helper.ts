import { sendEmail } from "@/lib/mailer";
import { getHasedToken } from "@/lib/utils";
import User from "@/models/user.model";

export const sendVerificationEmail = async (userId: string) => {
  try {
    const verifyToken = await getHasedToken(userId.toString());
    const verifyTokenExpiry = Date.now() + 3600000;
    const user = await User.findByIdAndUpdate(userId, {
      verifyToken,
      verifyTokenExpiry,
    });
    if (!user) {
      return false;
    }
    const { email } = user;
    await sendEmail({
      to: email,
      subject: "User Sign up success",
      text: `Verify using ${process.env.DOMAIN}/verifyEmail/${verifyToken}`,
    });
    console.log("An Verification Email has been sent to ", email);
    return true;
  } catch (error) {
    console.log("Error while sending verification email");
  }
  return false;
};
