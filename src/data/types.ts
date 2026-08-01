export type PlacePhoto = {
  decade: number;
  yearExact?: number;
  src: string;
  credit?: string;
  caption?: string;
};

export type Place = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  story?: string;
  photos: PlacePhoto[];
};

export type ContributionPayload = {
  authorName: string;
  email?: string;
  placeName: string;
  address: string;
  decade: number;
  yearExact?: number;
  caption?: string;
  rightsAccepted: boolean;
};

export type PendingSubmission = ContributionPayload & {
  id: string;
  status: "pending";
  createdAt: string;
  imagePath: string;
  originalFilename: string;
};
