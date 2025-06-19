import { ALL_BOOKS } from "@/graphql/book/query/all-books-query";
import axios from "axios";

export const getAllBooks = async () => {
  const response = await axios.post(
    "http://localhost:3000/graphql",
    {
      query: ALL_BOOKS,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage["token"]}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data?.allBooks || [];
};
