import db from './../models';
import { createNewUser, getUsers } from '../services/CRUDServices';

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        return res.render("homePage", { data: JSON.stringify(data) })
    } catch (err) {
        console.log(err);
    }
}

const getCRUD = async (req, res) => {
    try {
        const data = await db.User.findAll();
        return res.render("crud", { data: JSON.stringify(data) })
    } catch (err) {
        console.log(err);
    }
}

const postCRUD = async (req, res) => {
    try {
        const response = await createNewUser(req.body);
        console.log(response)
        return res.render("post-crud", { data: JSON.stringify(req.body) })
    } catch (err) {
        console.log(err);
    }
}

const displayGetCRUD = async (req, res) => {
    try {
        const response = await getUsers();
        console.log(response);
        return res.render("get-crud", { data: response })
    } catch (err) {
        console.log(err)
    }
}

const putCRUD = async (req, res) => {
    try {
        return res.render("put-crud")
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    putCRUD
}