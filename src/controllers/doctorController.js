import { getTopDoctorHomeServices } from "../services/doctorServices";

export const getTopDoctorHome = async (req, res) => {
  try {
    const { limit } = req.query;
    const data = await getTopDoctorHomeServices(limit || 10);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};
