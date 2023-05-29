import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
const router = express.Router();

export default function initWebRoutes(app) {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);
    router.get("/put-crud", homeController.putCRUD);
    router.post("/update-crud", homeController.updateCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);



    router.post("/api/login", userController.handleLogin);
    router.post("/api/users", userController.getUsers);
    router.post("/api/user/create", userController.createUser);
    router.post("/api/user/edit", userController.editUser);
    router.delete("/api/user", userController.deleteUser);

    return app.use("/", router);
}