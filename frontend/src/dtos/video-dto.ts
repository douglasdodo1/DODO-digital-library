import { MaterialDto } from "./material-dto";

export interface VideoDto {
  id: string;
  durationMinutes: number;
  material: MaterialDto;
}
