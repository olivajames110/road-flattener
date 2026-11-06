export type LatLng = [number, number];
export type Cat = "city" | "town" | "airport" | "mountain" | "coastal" | "race" | "island";
export type Status = "requested" | "progress" | "released";
export type CommentType = "feedback" | "issue" | "question";
export type GroupBy = "country" | "az" | "votes" | "new" | "status";
export type SortBy = "votes" | "new" | "issues";

export type Shape =
  | { type: "circle"; center: LatLng; radius: number } // radius in metres
  | { type: "polygon"; points: LatLng[] };

export interface AreaComment {
  id: string;
  author: string;
  dev?: boolean;
  type: CommentType;
  text: string;
  image?: string;
  pin?: LatLng;
  date: number;
  local?: boolean; // Only stored in this browser until the database exists
}

export interface Area {
  id: string;
  name: string;
  region: string;
  country: string;
  icao: string;
  cat: Cat;
  noPhotogrammetry?: boolean;
  status: Status;
  votes: number;
  voted: boolean;
  by: string;
  date: number;
  notes: string;
  shape: Shape;
  comments: AreaComment[];
  packageName?: string;
  version?: string;
  local?: boolean; // Only stored in this browser until the database exists
}

export interface Draft {
  type: "radius" | "polygon";
  center: LatLng | null;
  radius: number;
  points: LatLng[];
  closed: boolean;
}

export interface SubmitForm {
  name: string;
  region: string;
  icao: string;
  notes: string;
  cat: Cat;
}

export interface CommentDraft {
  type: CommentType;
  text: string;
  image: string | null;
  pin: LatLng | null;
}

export interface FlyRequest {
  bounds: [LatLng, LatLng];
  maxZoom: number;
  nonce: number;
}
