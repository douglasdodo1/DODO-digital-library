export const EDIT_BOOK = `
    mutation UpdateBook($input: UpdateBookInput!) {
    updateBook(input: $input) {
        book {
            isbn
            pageNumbers
            material {
                title
                category
                description
                status
                publicationDate
                author {
                    name
                }
            }
        }
        errors
    }
    }

`;
