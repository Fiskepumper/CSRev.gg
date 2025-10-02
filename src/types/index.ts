export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  creator: string;
  owner: string;
  collection: string;
  likes: number;
  createdAt: string;
  views: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  banner: string;
  creator: string;
  itemCount: number;
  floorPrice: number;
  volume: number;
  verified: boolean;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio: string;
  joinedDate: string;
}