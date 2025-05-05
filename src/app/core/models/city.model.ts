import { Department } from './department.model';

export interface City {
  id: number;
  name: string;
  departmentResponse?: Department;

}
