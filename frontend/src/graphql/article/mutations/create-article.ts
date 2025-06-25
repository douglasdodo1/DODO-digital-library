import axios from "axios";
import { CREATE_ARTICLE } from "../query/create-article-query";
import { articleInput } from "@/app/inputs/article/article-input";

export async function createArticle(input: articleInput) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
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
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Erro ao criar artigo:", error);
    throw error;
  }
}
