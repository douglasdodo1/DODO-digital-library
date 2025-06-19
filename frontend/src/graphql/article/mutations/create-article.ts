import axios from "axios";
import { CREATE_ARTICLE } from "../query/create-article-query";
import { articleInput } from "@/app/inputs/article/article-input";

export async function createArticle(input: articleInput) {
  try {
    const response = await axios.post(
      "http://localhost:3000/graphql",
      {
        query: CREATE_ARTICLE,
        variables: { input },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage["token"]}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar artigo:", error);
    throw error;
  }
}
