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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjcGYiOiIxMjA4NTE3MjQ0MCIsImV4cCI6MTc0OTkxMDQ0NX0.Xma8Kwm-Arx4b7_g_i43Gmy4TrryidJTO6cNvMQPx80`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data?.allArticles || [];
};
