import db from "./../models";
import {
  createNewUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../services/CRUDServices";

export const getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll();
    return res.render("homePage", { data: JSON.stringify(data) });
  } catch (err) {
    console.log(err);
  }
};

export const getCRUD = async (req, res) => {
  try {
    const data = await db.User.findAll();
    return res.render("crud", { data: JSON.stringify(data) });
  } catch (err) {
    console.log(err);
  }
};

export const postCRUD = async (req, res) => {
  try {
    const response = await createNewUser(req.body);
    return res.render("post-crud", { data: JSON.stringify(req.body) });
  } catch (err) {
    console.log(err);
  }
};

export const displayGetCRUD = async (req, res) => {
  try {
    const response = await getUsers();
    return res.render("get-crud", { data: response });
  } catch (err) {
    console.log(err);
  }
};

export const putCRUD = async (req, res) => {
  try {
    const userId = req.query.id;
    const response = await getUserById(userId);
    return res.render("put-crud", { data: response });
  } catch (err) {
    console.log(err);
  }
};

export const updateCRUD = async (req, res) => {
  try {
    const response = await updateUserById(req.body);
    return res.render("update-crud", { data: response });
  } catch (err) {
    console.log(err);
  }
};

export const deleteCRUD = async (req, res) => {
  try {
    const userId = req.query.id;
    const response = await deleteUserById(userId);
    return res.render("delete-crud", { data: response });
  } catch (err) {
    console.log(err);
  }
};
