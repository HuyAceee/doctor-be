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

export const markdownFields = ["doctorId", "clinicId", "specialtyId", "id"];

export const getFieldQuery = (data) => {
  let query = {};
  Object.keys(data).forEach((field) => {
    if (markdownFields.includes(field)) {
      query = {
        ...query,
        [field]: data[field],
      };
    }
  });
  if (Object.keys(query).length) return query;
  return null;
};
