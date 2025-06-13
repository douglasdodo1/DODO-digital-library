import { MaterialDto } from "./material-dto";

export interface ArticleDto {
  doi: string;
  language: string;
  material: MaterialDto;
}
