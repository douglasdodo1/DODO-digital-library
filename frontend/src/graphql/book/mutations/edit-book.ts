import axios from "axios";
import { bookInput } from "@/app/inputs/book/book-input";
import { EDIT_BOOK } from "../query/edit-book-query";

export async function editBook(input: Partial<bookInput>) {
  try {
    const response = await axios.post(
      "http://localhost:3000/graphql",
      {
        query: EDIT_BOOK,
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
    console.error("Erro ao editar livro:", error);
    throw error;
  }
}
