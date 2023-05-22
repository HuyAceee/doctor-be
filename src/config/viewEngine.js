import express from "express";
import path from 'path';

export default function viewEngine(app) {
    app.use(express.static(path.join("./src", "public")));
    app.set("views", path.join("./src", "views"));
    app.set("view engine", "ejs");

}