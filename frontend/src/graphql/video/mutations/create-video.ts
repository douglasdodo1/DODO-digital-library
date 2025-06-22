import { videoInput } from "@/app/inputs/video-input";
import axios from "axios";
import { CREATE_VIDEO } from "../query/create-video-input";

export async function createVideo(input: videoInput) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
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
