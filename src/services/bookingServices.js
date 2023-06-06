import { serverError } from "../utils/constants";
import db from "../models";
import { v4 as uuidv4 } from "uuid";
import { sendMailer } from "../utils/functions";

export const createBookingServices = async (data) => {
  try {
    console.log(data)
    const user = await db.User.findOrCreate({
      where: { email: data.email },
      defaults: {
        email: data.email,
        roleId: "R3",
      },
      raw: true
    });
    const { email, ...rest } = data;
    if (!user) return serverError;
    const booking = await db.Booking.findOrCreate({
      where: rest,
      defaults: {
        ...rest,
        patientId: user[0].id,
        token: uuidv4(),
        statusId: 'S1'
      },
      raw: true,
      nest: true,
      include: [
        {
          model: db.User,
          as: "doctorData",
          attributes: ["firstName", "lastName"],
        },
        {
          model: db.AllCode,
          as: "timeTypeData",
          attributes: ["valueEn"],
        },
      ],
    });
    console.log(booking)
    if (booking) {
      await sendMailer(data, booking[0].doctorId, booking[0].doctorData.firstName + booking[0].doctorData.lastName, booking[0].timeTypeData.valueEn, booking[0].token);
    }
    return {
      statusCode: 200,
      message: "OK",
      booking: booking[0]
    };

  } catch (err) {
    return serverError;
  }
};
