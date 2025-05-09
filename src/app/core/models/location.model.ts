// location.model.ts
import { City } from './city.model';

export interface Location {
  id: number;
  name: string;
  idCity: number;
  city: City;
}