export interface VisitsResponse {
  id:             number;
  houseId:        number;
  sellerId:       number;
  startDateTime:  string;
  endDateTime:    string;
  locationId:     number;
}

export interface SaveVisitRequest {
  houseId:        number;
  startDateTime:  string;
  endDateTime:    string;
}
