export interface CreateVideoInput {
  title: string;
  category: string;
  description?: string;
  status: string;
  authorName: string;
  authorType: string;
  personDateOfBirth?: string;
  institutionCity?: string;
  publicationDate: string;
}
