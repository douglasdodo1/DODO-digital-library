import axios from "axios";
import { bookInput } from "@/app/inputs/book/book-input";
import { EDIT_BOOK } from "../query/edit-book-query";

export async function editBook(input: Partial<bookInput>) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
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
    console.log("Resposta: " + JSON.stringify(response));

    return response.data;
  } catch (error) {
    console.error("Erro ao editar livro:", error);
    throw error;
  }
}
