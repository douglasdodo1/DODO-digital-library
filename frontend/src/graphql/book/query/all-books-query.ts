export const ALL_BOOKS = `
  query AllBooks {
    allBooks {
      isbn
      pageNumbers
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
