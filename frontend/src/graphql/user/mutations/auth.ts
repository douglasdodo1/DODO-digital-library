import { AuthDto } from "@/dtos/auth-dto";
import axios from "axios";
import { AUTH_QUERY } from "../query/auth-query";

export async function auth(input: AuthDto) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      {
        query: AUTH_QUERY,
        variables: { input },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`resposta: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao logar:", error);
    throw error;
  }
}
