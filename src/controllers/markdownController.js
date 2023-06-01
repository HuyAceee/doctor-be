import {
  deleteMarkdownServices,
  getMarkdownServices,
  handleMarkdownServices,
} from "../services/markdownServices";

export const handleMarkdown = async (req, res) => {
  try {
    const data = await handleMarkdownServices(req.body);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const getMarkdown = async (req, res) => {
  try {
    const data = await getMarkdownServices(req.query);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteMarkdown = async (req, res) => {
  try {
    const data = await deleteMarkdownServices(req.body);
    return res.status(data.statusCode).json(data);
  } catch (err) {
    console.log(err);
  }
};
