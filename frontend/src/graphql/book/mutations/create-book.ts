import axios from "axios";
import { bookInput } from "@/app/inputs/book/book-input";
import { CREATE_BOOK } from "@/graphql/book/query/create-book-query";

export async function createBook(input: bookInput) {
  try {
    const response = await axios.post(
      "http://localhost:3000/graphql",
      {
        query: CREATE_BOOK,
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
    console.error("Erro ao criar livro:", error);
    throw error;
  }
}
