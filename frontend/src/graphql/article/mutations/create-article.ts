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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjcGYiOiIxMjA4NTE3MjQ0MCIsImV4cCI6MTc0OTgyNjE0N30.CRUPjG4cpWGBpADFivUhwVvgGK3CT-4B744d7YBQvbs`,
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
