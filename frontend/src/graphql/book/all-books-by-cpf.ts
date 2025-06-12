export const ALL_BOOKS_BY_CPF = `
  query AllBooksByCpf {
    allBooksByCpf {
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
