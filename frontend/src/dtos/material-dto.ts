import { AuthorDto } from "./author-dto";

export interface MaterialDto {
  id: string;
  title: string;
  description?: string;
  status: string;
  authorId: string;
  author?: AuthorDto;
}
