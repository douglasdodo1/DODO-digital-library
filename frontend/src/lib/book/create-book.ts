import axios from "axios";
import { CreateBookInput } from "@/dtos/create-book-input";
import { CREATE_BOOK } from "@/graphql/book/create-book-query";

export async function createBook(input: CreateBookInput) {
  try {
    const response = await axios.post(
      "http://localhost:3000/graphql",
      {
        query: CREATE_BOOK,
        variables: { input },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`resposta: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    throw error;
  }
}
