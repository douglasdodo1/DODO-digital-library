import { AuthorDto } from "./author-dto";

export interface MaterialDto {
  id: string;
  title: string;
  category: string;
  description?: string;
  status: string;
  authorId: string;
  author: AuthorDto;
  publicationDate: string;
}
