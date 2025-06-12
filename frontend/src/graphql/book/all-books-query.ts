export const ALL_BOOKS = `
  query AllBooks {
    allBooks {
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
  }
`;
