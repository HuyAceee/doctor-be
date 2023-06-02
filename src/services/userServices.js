import db from "../models";
import bcrypt from "bcryptjs";
import {
  configGetNotPassword,
  notFoundError,
  serverError,
} from "../utils/constants";
import { convertImageFromBuffer, hashPassword } from "../utils/functions";

export const loginServices = async (data) => {
  const { email, password } = data;
  try {
    if (!email || !password) {
      return {
        statusCode: 404,
        message: "Invalid inputs",
      };
    }
    let user = await db.User.findOne({
      where: { email },
      raw: true,
    });
    if (!user) {
      return notFoundError;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return {
        statusCode: 401,
        message: "Invalid password",
      };
    }
    delete user.password;
    return {
      ...user,
      statusCode: 200,
      message: "OK",
    };
  } catch (err) {
    return serverError;
  }
};

export const getUsersServices = async (id) => {
  try {
    let users;
    console.log(db);
    if (!id) {
      users = await db.User.findAll(configGetNotPassword);
      users = users.map((user) => {
        if (user && user.image) {
          return {
            ...user,
            image: convertImageFromBuffer(user.image),
          };
        }
        return user;
      });
    } else {
      users = await db.User.findOne({
        where: { id },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Markdown,
            as: "markdownData",
            attributes: ["id", "description", "contentHTML", "contentMarkdown"],
          },
        ],
        ...configGetNotPassword,
      });
      if (users && users.image) {
        users.image = convertImageFromBuffer(users.image);
      }
    }
    return {
      statusCode: 200,
      message: "OK",
      users,
    };
  } catch (err) {
    return serverError;
  }
};

export const createUserServices = async (body) => {
  try {
    const user = await db.User.findOne({
      where: { email: body.email },
    });
    if (user) {
      return {
        statusCode: 400,
        message: "User already exists!",
      };
    }
    const hashPasswordUser = await hashPassword(body.password);
    await db.User.create({
      ...body,
      password: hashPasswordUser,
    });
    return {
      statusCode: 200,
      message: "OK",
    };
  } catch (err) {
    return serverError;
  }
};

export const editUserServices = async (body) => {
  try {
    const user = await db.User.findOne({
      where: { id: body.id },
      raw: false,
    });
    if (!user) {
      return {
        statusCode: 404,
        message: "User does not exist!",
      };
    }
    Object.keys(body)
      .filter((i) => i !== "id")
      .forEach((i) => {
        user[i] = body[i];
      });
    await user.save();
    return {
      statusCode: 200,
      message: "OK",
    };
  } catch (err) {
    return serverError;
  }
};

export const deleteUserServices = async (id) => {
  try {
    const user = await db.User.findOne({
      where: { id },
      raw: false,
    });
    if (!user) {
      return notFoundError;
    }
    await user.destroy();
    return {
      statusCode: 200,
      message: "OK",
    };
  } catch (err) {
    return serverError;
  }
};
