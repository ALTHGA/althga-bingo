export interface IRoom {
  id?: string;
  user: {
    id: string;
    name: string;
  };
  product: {
    name: string;
    description: string;
    images: string[];
  };
  likes: number;
  startOf: string;
  startEnd: string;
  amount: number;
}
