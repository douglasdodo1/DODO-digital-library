export const CREATE_BOOK = `
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      book {
        isbn
        pageNumbers
        material {
          title
          description
          status
          author {
            name
          }
        }
      }
      errors
    }
  }
`;
