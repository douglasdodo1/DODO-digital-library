export const ALL_VIDEOS = `
  query AllVideos {
    allVideos {
      id
      durationMinutes
      material {
        title
        description
        status
        author {
          name
        }
      }
    }
  }
`;
