import dotenv from "dotenv";

dotenv.config();
// console.log(process.env.COOKIE_EXPIRE);
export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  console.log("🚀 ~ generateToken ~ cookieName:", cookieName);

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      sameSite: "None",
      secure: true,
    })
    .json({ success: true, message, user, token });
};
