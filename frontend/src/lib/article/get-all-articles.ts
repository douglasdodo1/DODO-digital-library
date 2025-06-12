import { ALL_ARTICLES } from "@/graphql/article/all-articles-query";
import axios from "axios";

export const getAllArticles = async () => {
  const response = await axios.post(
    "http://localhost:3000/graphql",
    {
      query: ALL_ARTICLES,
    },
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjcGYiOiIxMjA4NTE3MjQ0MCIsImV4cCI6MTc0OTgyNjE0N30.CRUPjG4cpWGBpADFivUhwVvgGK3CT-4B744d7YBQvbs`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data?.allArticles || [];
};
