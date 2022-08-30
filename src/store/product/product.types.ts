export type Polish = {
  id: string;
  brand: string;
  name: string;
  color: string;
  effects: string[];
  multichrome: string[];
  imageUrls: string[];
  other: string[];
  volume: number;
};

export enum PRODUCT_ACTION_TYPES {
  FETCH_PRODUCT_LIST = 'FETCH_PRODUCT_LIST',
  FETCH_PRODUCT = 'FETCH_PRODUCT',
}
