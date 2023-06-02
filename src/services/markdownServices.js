import db from "../models";
import { notFoundError, serverError } from "../utils/constants";
import { getFieldQuery } from "../utils/functions";

export const handleMarkdownServices = async (data) => {
  try {
    if (!data?.id) {
      await db.Markdown.create(data);
      return {
        statusCode: 200,
        message: "OK",
      };
    }
    const markdown = await db.Markdown.findOne({
      where: { id: data?.id },
      raw: false,
    });
    console.log(markdown, data);
    Object.keys(data)
      .filter((i) => i !== "id")
      .forEach((i) => {
        markdown[i] = data[i];
      });
    await markdown.save();
    return {
      statusCode: 200,
      message: "OK",
    };
  } catch (err) {
    return serverError;
  }
};

export const getMarkdownServices = async (data) => {
  try {
    const query = getFieldQuery(data);
    const markdown = await db.Markdown.findOne({
      where: query,
      raw: false,
    });
    return {
      statusCode: 200,
      message: "OK",
      markdown,
    };
  } catch (err) {
    return serverError;
  }
};

export const deleteMarkdownServices = async (data) => {
  try {
    const query = getFieldQuery(data);
    if (!query) {
      return notFoundError;
    }
    const markdown = await db.Markdown.findOne({
      where: query,
      raw: false,
    });
    if (!markdown) {
      return notFoundError;
    }
    await markdown.destroy();
    return {
      statusCode: 200,
      message: "OK",
    };
  } catch (err) {
    return serverError;
  }
};
