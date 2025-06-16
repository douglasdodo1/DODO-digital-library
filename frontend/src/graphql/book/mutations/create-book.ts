import axios from "axios";
import { CreateBookInput } from "@/dtos/create-book-input";
import { CREATE_BOOK } from "@/graphql/book/query/create-book-query";

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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjcGYiOiIxMjA4NTE3MjQ0MCIsImV4cCI6MTc0OTgyNjE0N30.CRUPjG4cpWGBpADFivUhwVvgGK3CT-4B744d7YBQvbs`,
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
