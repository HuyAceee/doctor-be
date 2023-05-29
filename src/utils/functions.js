import bcryptjs from "bcryptjs";

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      resolve(hash);
    } catch (err) {
      reject(err);
    }
  });
};
