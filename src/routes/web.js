import express from "express";
const router = express.Router();
import {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  putCRUD,
  updateCRUD,
  deleteCRUD,
} from "../controllers/homeController";
import {
  handleLogin,
  getUsers,
  createUser,
  editUser,
  deleteUser,
} from "../controllers/userController";
import { getAllCode } from "../controllers/allCodeController";
import { getTopDoctorHome } from "../controllers/doctorController";
import { getInformation } from "../controllers/informationController";
import {
  deleteMarkdown,
  getMarkdown,
  handleMarkdown,
} from "../controllers/markdownController";

export default function initWebRoutes(app) {
  router.get("/", getHomePage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCRUD);
  router.get("/get-crud", displayGetCRUD);
  router.get("/put-crud", putCRUD);
  router.post("/update-crud", updateCRUD);
  router.get("/delete-crud", deleteCRUD);

  router.post("/api/login", handleLogin);
  router.post("/api/users", getUsers);
  router.post("/api/user/create", createUser);
  router.post("/api/user/edit", editUser);
  router.delete("/api/user", deleteUser);
  router.get("/api/allcode", getAllCode);

  router.get("/api/top-doctor-home", getTopDoctorHome);
  router.get("/api/doctors", getTopDoctorHome);
  router.post("/api/get-information", getInformation);
  router.post("/api/markdown", handleMarkdown);
  router.get("/api/markdown", getMarkdown);
  router.delete("/api/markdown", deleteMarkdown);

  return app.use("/", router);
}
