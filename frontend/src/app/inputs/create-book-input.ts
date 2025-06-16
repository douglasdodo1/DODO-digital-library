export interface CreateBookInput {
  isbn: string;
  pageNumbers: number;
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
