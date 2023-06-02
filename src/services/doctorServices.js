import db from "../models";
import { configGetNotPassword, serverError } from "../utils/constants";
import { convertImageFromBuffer } from "../utils/functions";

export const getTopDoctorHomeServices = async (limit) => {
  try {
    let doctors = await db.User.findAll({
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

    doctors = doctors.map((doctor) => {
      if (doctor && doctor.image) {
        return {
          ...doctor,
          image: convertImageFromBuffer(doctor.image),
        };
      }
      return doctor;
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
