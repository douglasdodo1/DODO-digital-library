import axios from "axios";
import { CREATE_USER } from "../query/create-user-query";
import { CreateUserInput } from "@/app/inputs/create-user-input";

export async function createUser(input: CreateUserInput) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      {
        query: CREATE_USER,
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
    console.error("Erro ao criar usuario:", error);
    throw error;
  }
}
