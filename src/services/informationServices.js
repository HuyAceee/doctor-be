import db from "../models";
import { notFoundError, serverError } from "../utils/constants";

export const getInformationServices = async (id) => {
  try {
    if (!id) {
      return notFoundError;
    }
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
