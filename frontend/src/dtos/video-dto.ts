import { MaterialDto } from "./material-dto";

export interface VideoDto {
  id: number;
  durationMinutes: number;
  material: MaterialDto;
}
