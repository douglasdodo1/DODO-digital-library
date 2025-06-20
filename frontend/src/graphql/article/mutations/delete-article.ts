import axios from "axios";

export async function deleteArticle(doi: string) {
  try {
    const response = await axios.post(
      "http://localhost:3000/graphql",
      {
        query: `
          mutation DeleteArticle($input: DeleteArticleInput!) {
            deleteArticle(input: $input) {
                success
                errors
            }
        }`,
        variables: {
          input: {
            doi: doi,
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
    console.error("Erro ao deletar artigo:", error);
    throw error;
  }
}
