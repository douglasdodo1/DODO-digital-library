import { MaterialDto } from "./material-dto";

export interface VideoDto {
  id: string;
  duration_minutes: number;
  material: MaterialDto;
}
