import {
  loginServices,
  getUsersServices,
  createUserServices,
  editUserServices,
  deleteUserServices,
} from "../services/userServices";

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginServices({ email, password });
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await getUsersServices(id);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (req, res) => {
  try {
    const body = req.body;
    const data = await createUserServices(body);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const editUser = async (req, res) => {
  try {
    const body = req.body;
    const data = await editUserServices(body);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await deleteUserServices(id);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};
