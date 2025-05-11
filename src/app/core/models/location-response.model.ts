export interface DepartmentResponse {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface CityResponse {
    id: number;
    name: string;
    description?: string;
    departmentResponse: DepartmentResponse;
  }
  
  export interface LocationResponse {
    id: number;
    name: string;
    cityResponse: CityResponse;
  }