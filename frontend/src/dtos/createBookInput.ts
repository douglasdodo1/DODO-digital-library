export interface CreateBookInput {
  isbn: string;
  pageNumbers: number;
  title: string;
  description?: string;
  status: string;
  authorName: string;
  authorType: string;
  personDateOfBirth: string;
}
