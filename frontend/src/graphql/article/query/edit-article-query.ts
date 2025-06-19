export const EDIT_ARTICLE = `
    mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
        article {
            doi
            language
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
