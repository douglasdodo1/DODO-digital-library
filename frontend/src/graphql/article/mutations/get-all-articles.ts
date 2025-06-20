import { ALL_ARTICLES } from "@/graphql/article/query/all-articles-query";
import axios from "axios";

export const getAllArticles = async () => {
  const response = await axios.post(
    "http://localhost:3000/graphql",
    {
      query: ALL_ARTICLES,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage["token"]}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data?.allArticles || [];
};
