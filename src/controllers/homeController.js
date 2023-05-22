import db from "./../models";
import {
  createNewUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../services/CRUDServices";

const getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll();
    return res.render("homePage", { data: JSON.stringify(data) });
  } catch (err) {
    console.log(err);
  }
};

const getCRUD = async (req, res) => {
  try {
    const data = await db.User.findAll();
    return res.render("crud", { data: JSON.stringify(data) });
  } catch (err) {
    console.log(err);
  }
};

const postCRUD = async (req, res) => {
  try {
    const response = await createNewUser(req.body);
    return res.render("post-crud", { data: JSON.stringify(req.body) });
  } catch (err) {
    console.log(err);
  }
};

const displayGetCRUD = async (req, res) => {
  try {
    const response = await getUsers();
    return res.render("get-crud", { data: response });
  } catch (err) {
    console.log(err);
  }
};

const putCRUD = async (req, res) => {
  try {
    const userId = req.query.id;
    const response = await getUserById(userId);
    return res.render("put-crud", { data: response });
  } catch (err) {
    console.log(err);
  }
};

const updateCRUD = async (req, res) => {
  try {
    const response = await updateUserById(req.body);
    return res.render("update-crud", { data: response });
  } catch (err) {
    console.log(err);
  }
};

const deleteCRUD = async (req, res) => {
  try {
    const userId = req.query.id;
    const response = await deleteUserById(userId);
    return res.render("delete-crud", { data: response });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  putCRUD,
  updateCRUD,
  deleteCRUD,
};
