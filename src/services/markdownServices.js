import db from "../models";
import { serverError } from "../utils/constants";

export const handleMarkdownServices = async (data) => {
    try {
        await db.Markdown.create(data);
        return {
            statusCode: 200,
            message: "OK",
        };
    } catch (err) {
        return serverError;
    }
};
