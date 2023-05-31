import { handleMarkdownServices } from "../services/markdownServices";

export const handleMarkdown = async (req, res) => {
    try {
        const data = await handleMarkdownServices(req.body);
        return res.status(data.statusCode).json(data);
    } catch (err) {
        console.log(err);
    }
};
