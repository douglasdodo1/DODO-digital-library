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
        }
        publicationDate
      }
    }
  }
`;
