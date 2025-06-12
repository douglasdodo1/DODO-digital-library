import { MaterialDto } from "./material-dto";

export interface BookDto {
  isbn: string;
  pageNumbers: number;
  material: MaterialDto;
}
