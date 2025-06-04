export interface SellerHouseQueryParams {
  page: number;
  size: number;
  name?: string;
  category?: string;
  minPrice?: number;
  location?: string;
  orderAsc?: boolean;
}
