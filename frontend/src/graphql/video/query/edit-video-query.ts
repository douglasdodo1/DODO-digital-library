export const EDIT_VIDEO = `
  mutation UpdateVideo($input: UpdateVideoInput!) {
    updateVideo(input: $input) {
      video {
        id
        durationMinutes
        material {
          title
          category
          description
          status
          publicationDate
          author {
            name
            person {
              birthDate
            }
            institution {
              city
            }
          }
        }
      }
      errors
    }
  }
`;
