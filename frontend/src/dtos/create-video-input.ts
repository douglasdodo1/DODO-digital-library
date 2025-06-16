export interface CreateVideoInput {
  doi: string;
  language: string;
  title: string;
  category: string;
  description?: string;
  status: string;
  authorName: string;
  authorType: string;
  personDateOfBirth: string;
  publicationDate: string;
}
