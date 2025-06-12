// src/lib/graphql/get-books.ts

import { ALL_BOOKS_BY_CPF } from "@/graphql/book/all-books-by-cpf";
import axios from "axios";

export const booksByCpf = async () => {
  const response = await axios.post(
    "http://localhost:3000/graphql",
    {
      query: ALL_BOOKS_BY_CPF,
    },
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjcGYiOiI3NjkxMjg4ODA4OSIsImV4cCI6MTc0OTc4NjI4N30.Q8pAar8l73tiVEskdqadPJdIlDTU0ETcjfl_517JJfc`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data?.allBooksByCpf || [];
};
