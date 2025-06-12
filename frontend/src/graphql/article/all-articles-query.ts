export const ALL_ARTICLES = `
  query AllArticles {
    allArticles {
      doi
      publicationDate
      language
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
