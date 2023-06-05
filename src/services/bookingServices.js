import { serverError } from "../utils/constants";
import db from "../models";
import { v4 as uuidv4 } from "uuid";

export const createBookingServices = async (data) => {
  try {
    const user = await db.User.findOrCreate({
      where: { email: data.email },
      defaults: {
        email: data.email,
        roleId: "R3",
      },
    });
    const { email, ...rest } = data;
    // if (user) {
    //   await db.Booking.create({
    //     ...rest,
    //     patientId: user.id,
    //     token: uuidv4(),
    //   });
    // }
    return serverError;
  } catch (err) {
    return serverError;
  }
};
