import { catchError } from "../middleware/catchErrors.js";
import MessageModel from "../models/messageModel.js";
import ErrorHandler from "../middleware/errorMiddleware.js";

const sendMessage = catchError(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill full form", 400));
    //  res
    //   .status(400)
    //   .json({ success: false, message: "Please fill full form" });
  }
  await MessageModel.create(req.body);
  res.status(200).json({ success: true, message: "Message Send Successfully" });
});

export { sendMessage };
