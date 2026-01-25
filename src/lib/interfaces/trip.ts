export interface TripStop {
  id: string;
  tripId: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  googleMapsUrl?: string;
  order: number;
}

export interface Trip {
  id: string;
  title: string;
  description: string | null;
  totalDistance: number;
  createdAt: string;
  updatedAt: string;
  stops: TripStop[];
}
