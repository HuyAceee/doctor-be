import { createBookingServices, updateBookingServices } from "../services/bookingServices";

export const createBooking = async (req, res) => {
  try {
    const data = await createBookingServices(req.body);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const updateBooking = async (req, res) => {
  try {
    const data = await updateBookingServices(req.body);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};
