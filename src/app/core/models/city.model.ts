import { Department } from './department.model';

export interface City {
  id: number;
  name: string;
  description?: string;
  idDepartment: number;       
  department: Department;    
}