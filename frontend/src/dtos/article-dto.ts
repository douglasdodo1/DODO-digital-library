import { MaterialDto } from "./material-dto";

export interface ArticleDto {
  doi: string;
  publication_date: string;
  language: string;
  material: MaterialDto;
}
