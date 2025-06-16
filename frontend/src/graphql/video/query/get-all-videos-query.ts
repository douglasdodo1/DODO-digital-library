export const ALL_VIDEOS = `
  query AllVideos {
    allVideos {
      id
      durationMinutes
      material {
        title
        category
        description
        status
        author {
          name
        }
        publicationDate
      }
    }
  }
`;
