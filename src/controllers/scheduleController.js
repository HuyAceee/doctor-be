import {
  createSchedulesServices,
  getScheduleDoctorInDateServices,
} from "../services/scheduleServices";

export const getScheduleDoctorInDate = async (req, res) => {
  try {
    const data = await getScheduleDoctorInDateServices(req.body);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const createSchedule = async (req, res) => {
  try {
    const data = await createSchedulesServices(req.body);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};
