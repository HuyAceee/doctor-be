export const configGetNotPassword = { attributes: { exclude: ["password"] } };

export const serverError = {
  statusCode: 500,
  message: "Server error",
};

export const notFoundError = {
  statusCode: 404,
  message: "Not found!",
};
