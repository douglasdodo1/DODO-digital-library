import { CreateVideoInput } from "@/dtos/create-video-input";
import axios from "axios";
import { CREATE_VIDEO } from "../query/create-video-input";

export async function createVideo(input: CreateVideoInput) {
  try {
    const response = await axios.post(
      "http://localhost:3000/graphql",
      {
        query: CREATE_VIDEO,
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
    console.error("Erro ao criar video:", error);
    throw error;
  }
}
