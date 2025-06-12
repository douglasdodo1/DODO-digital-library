export interface CreateArticleInput {
  doi: string;
  publicationDate: number;
  language: string;
  title: string;
  description?: string;
  status: string;
  authorName: string;
  authorType: string;
  personDateOfBirth: string;
}
