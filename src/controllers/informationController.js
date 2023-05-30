import { getInformationServices } from "../services/informationServices";

export const getInformation = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await getInformationServices(id);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};
