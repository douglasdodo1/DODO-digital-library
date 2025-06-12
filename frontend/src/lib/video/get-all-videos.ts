import { ALL_VIDEOS } from "@/graphql/video/get-all-videos";
import axios from "axios";

export const getAllVideos = async () => {
  const response = await axios.post(
    "http://localhost:3000/graphql",
    {
      query: ALL_VIDEOS,
    },
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjcGYiOiIxMjA4NTE3MjQ0MCIsImV4cCI6MTc0OTgyNjE0N30.CRUPjG4cpWGBpADFivUhwVvgGK3CT-4B744d7YBQvbs`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data?.allVideos || [];
};
