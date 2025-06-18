export interface EditVideoInput {
  title: string;
  category: string;
  description?: string;
  status: string;
  authorName: string;
  authorType: string;
  personDateOfBirth?: string;
  institutionCity?: string;
  publicationDate: string;
  durationMinutes: number;
}
