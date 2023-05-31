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
    console.log(db.DoctorInfo, db.User);
    const info = await db.User.findAll({
      raw: true,
    });
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
