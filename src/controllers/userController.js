import { loginServices, getUsersServices } from "../services/userServices";

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginServices({ email, password });
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await getUsersServices(id);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleLogin,
  getUsers,
};
