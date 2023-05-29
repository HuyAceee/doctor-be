import db from "../models";
import { configGetNotPassword, serverError } from "../utils/constants";

export const getTopDoctorHomeServices = async (limit) => {
  try {
    const doctors = await db.User.findAll({
      where: { roleId: "R2" },
      limit,
      raw: true,
      nest: true,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.AllCode,
          as: "positionData",
          attributes: ["valueVi", "valueEn"],
        },
        {
          model: db.AllCode,
          as: "genderData",
          attributes: ["valueVi", "valueEn"],
        },
        {
          model: db.AllCode,
          as: "roleData",
          attributes: ["valueVi", "valueEn"],
        },
      ],
      ...configGetNotPassword,
    });
    if (doctors) {
      return {
        statusCode: 200,
        message: "OK",
        doctors,
      };
    }
  } catch (err) {
    return serverError;
  }
};
