import axios from "axios";
import { GET_USER } from "../query/get-user-query";

export async function getUser() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      {
        query: GET_USER,
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
    console.error("Erro ao buscar usuario:", error);
    throw error;
  }
}
