import axios from "axios";

export async function deleteBook(isbn: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      {
        query: `
          mutation DeleteBook($input: DeleteBookInput!) {
            deleteBook(input: $input) {
              success
              errors
            }
          }
        `,
        variables: {
          input: {
            isbn: isbn,
          },
        },
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
    console.error("Erro ao deletar livro:", error);
    throw error;
  }
}
