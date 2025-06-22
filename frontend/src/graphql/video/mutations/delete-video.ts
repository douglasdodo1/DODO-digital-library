import axios from "axios";

export async function deleteVideo(id: number) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      {
        query: `
          mutation DeleteVideo($input: DeleteVideoInput!) {
            deleteVideo(input: $input) {
              success
              errors
            }
          }
        `,
        variables: {
          input: {
            id: id,
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
    console.error("Erro ao deletar video:", error);
    throw error;
  }
}
