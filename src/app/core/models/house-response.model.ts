  export interface HouseResponse {
    id: number;
    sellerId: number;
    category: string;
    numberOfRooms: number;
    numberOfBathrooms: number;
    priceMin: number;
    location: {
    id: number;
    name: string;
    };
  }
