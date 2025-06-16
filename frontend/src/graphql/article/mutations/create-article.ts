import axios from "axios";
import { CREATE_ARTICLE } from "../query/create-article-query";
import { CreateArticleInput } from "@/dtos/create-article-input";

export async function createArticle(input: CreateArticleInput) {
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
    console.log(`resposta: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar artigo:", error);
    throw error;
  }
}
