import { articleInput } from "@/app/inputs/article/article-input";
import axios from "axios";
import { EDIT_ARTICLE } from "../query/edit-article-query";

export async function editArticle(input: Partial<articleInput>) {
  try {
    const response = await axios.post(
      "http://localhost:3000/graphql",
      {
        query: EDIT_ARTICLE,
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
    console.error("Erro ao editar artigo:", error);
    throw error;
  }
}
