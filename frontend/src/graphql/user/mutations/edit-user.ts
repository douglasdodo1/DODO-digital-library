import axios from "axios";
import { UPDATE_USER } from "../query/update-user-query";

interface EditUserInput {
  name: string;
  mail: string;
}
export async function editUser(input: EditUserInput) {
  try {
    const response = await axios.post(
      "http://localhost:3000/graphql",
      {
        query: UPDATE_USER,
        variables: { input },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage["token"]}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("resposta JSON:", JSON.stringify(response.data, null, 2));
    console.log("resposta JSON:", JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuario:", error);
    throw error;
  }
}
