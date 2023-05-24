const { loginServices } = require("../services/userServices")

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await loginServices({ email, password });
        return res.status(data.statusCode).json(data)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    handleLogin
}