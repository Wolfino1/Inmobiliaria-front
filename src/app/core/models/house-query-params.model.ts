export interface HouseQueryParams {
  page: number;
  size: number;
  sortBy: string;
  orderAsc: boolean;
  category?: string;
  location?: string;
  numberOfRooms?: number;
  numberOfBathrooms?: number;
  minPrice?: number;
  maxPrice?: number;
}
