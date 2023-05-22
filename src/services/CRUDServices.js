import bcryptjs from "bcryptjs";
import db from "../models";

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordUser = await hashPassword(data.password);
      await db.User.create({
        ...data,
        password: hashPasswordUser,
        gender: !!Number(data.gender),
      });
      resolve("create new user successfully!");
    } catch (err) {
      reject(err);
    }
  });
};

const hashPassword = () => {
  return new Promise((resolve, reject) => {
    try {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync("B4c0//", salt);
      resolve(hash);
    } catch (err) {
      reject(err);
    }
  });
};

const getUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};

const getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        raw: true,
      });
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};

const updateUserById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        await user.save();
        resolve("Update success!");
      } else {
        resolve("User not found!");
      }
    } catch (err) {
      reject(err);
    }
  });
};

const deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        raw: false,
      });
      if (user) {
        await user.destroy();
      }
      resolve("Delete success!");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createNewUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
