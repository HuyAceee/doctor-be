import db from "../models";
import { configGetNotPassword, serverError } from "../utils/constants";
import { convertImageFromBuffer } from "../utils/functions";

export const getScheduleDoctorInDateServices = async (data) => {
  try {
    const schedules = await db.Schedule.findAll({
      where: data,
    });
    if (schedules)
      return {
        statusCode: 200,
        message: "OK",
        schedules,
      };
  } catch (err) {
    return serverError;
  }
};

export const createSchedulesServices = async (data) => {
  try {
    await db.Schedule.bulkCreate(data);
    return {
      statusCode: 200,
      message: "OK",
    };
  } catch (err) {
    return serverError;
  }
};
