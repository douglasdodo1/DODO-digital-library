export const CREATE_VIDEO = `
    mutation CreateVideo($input: CreateVideoInput!) {
        createVideo(input: $input) {
            video {
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
            errors
        }
    }
`;
