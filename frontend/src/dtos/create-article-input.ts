export interface CreateArticleInput {
  doi: string;
  publicationDate: string;
  language: string;
  title: string;
  description?: string;
  status: string;
  authorName: string;
  authorType: string;
  personDateOfBirth?: string;
  institutionCity?: string;
}
