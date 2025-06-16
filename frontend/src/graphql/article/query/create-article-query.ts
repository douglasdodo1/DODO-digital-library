export const CREATE_ARTICLE = `
    mutation CreateArticle($input: CreateArticleInput!) {
        createArticle(input: $input) {
            article {
            doi
            material {
                title
                description
                status
                publicationDate

                author {
                name
                }
                
            }
            language
            }
            errors
        }
    }
`;
