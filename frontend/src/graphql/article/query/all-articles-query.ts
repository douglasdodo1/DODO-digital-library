export const ALL_ARTICLES = `
  query AllArticles {
    allArticles {
      doi
      language
      material {
        title
        category
        description
        status
        author {
          name
          person {
              birthDate
          }
          institution {
              city
          }
        }
        publicationDate
      }
    }
  }
`;
