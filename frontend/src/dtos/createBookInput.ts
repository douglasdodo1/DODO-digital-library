import { MaterialDto } from "./material-dto";

export interface CreateBookInput {
  isbn: string;
  page_numbers: number;
  material: MaterialDto;
}
