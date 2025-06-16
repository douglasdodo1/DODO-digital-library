export const CREATE_ARTICLE = `
    mutation CreateArticle($input: CreateArticleInput!) {
        createArticle(input: $input) {
            article {
                doi
                language
                material {
                    title
                    description
                    status
                    publicationDate
                    category
                    author {
                        name
                    }
                }
            }
            errors
        }
    }
`;
