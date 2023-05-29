import { getAllCodeServices } from "../services/allCodeServices";

export const getAllCode = async (req, res) => {
  try {
    const { type } = req.query;
    const data = await getAllCodeServices(type);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};
