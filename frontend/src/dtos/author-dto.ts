import { institutionDto } from "./institution-dto";
import { PersonDto } from "./person-dto";

export interface AuthorDto {
  id?: string;
  name: string;
  person?: PersonDto;
  institution?: institutionDto;
}
