import { videoInput } from "@/app/inputs/video-input";
import axios from "axios";
import { EDIT_VIDEO } from "../query/edit-video-query";

export async function editVideo(input: Partial<videoInput>) {
  try {
    const response = await axios.post(
      "http://localhost:3000/graphql",
      {
        query: EDIT_VIDEO,
        variables: { input },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage["token"]}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("resposta:", JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    console.error("Erro ao editar video:", error);
    throw error;
  }
}
