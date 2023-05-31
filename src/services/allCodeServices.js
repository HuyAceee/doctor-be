import db from "../models";
import { serverError } from "../utils/constants";

export const getAllCodeServices = async (type) => {
  try {
    console.log(db.AllCode);
    const allCode = await db.AllCode.findAll({
      where: { ...(type ? { type } : {}) },
      raw: true,
    });
    if (!allCode.length) {
      return {
        statusCode: 404,
        message: "This type is not available",
      };
    }
    return {
      statusCode: 200,
      message: "OK",
      allCode,
    };
  } catch (err) {
    return serverError;
  }
};
