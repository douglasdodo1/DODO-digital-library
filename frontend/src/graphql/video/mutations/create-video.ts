import { CreateVideoInput } from "@/app/inputs/create-video-input";
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
          Authorization: `Bearer ${localStorage["token"]}`,
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
