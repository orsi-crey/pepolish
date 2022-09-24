export type Polish = {
  id: string;
  brand: string;
  name: string;
  color: string;
  effects: string[];
  multichrome: string[];
  imageUrl: string;
  other: string[];
  volume: number;
};

export type PolishBottle = {
  productId: string;
  userId: string;
  locationUserId: string;
  fullPercentage: number;
  photoUrl: string;
};

export enum PRODUCT_ACTION_TYPES {
  FETCH_PRODUCT_LIST = 'FETCH_PRODUCT_LIST',
  FETCH_PRODUCT = 'FETCH_PRODUCT',
}
