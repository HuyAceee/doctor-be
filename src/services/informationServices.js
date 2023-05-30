import db from "../models";
import { serverError } from "../utils/constants";

export const getInformationServices = async (id) => {
  try {
    if (!id) {
      return {
        statusCode: 404,
        message: "User not found!",
      };
    }
    console.log(id);
    const info = await db.DoctorInfo.findAll();
    if (info) {
      return {
        statusCode: 200,
        message: "OK",
        info,
      };
    }
  } catch (err) {
    return serverError;
  }
};
