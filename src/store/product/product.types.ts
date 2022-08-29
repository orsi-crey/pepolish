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

export const initialPolish = {
  id: "",
  brand: "",
  name: "",
  color: "",
  effects: [],
  multichrome: [],
  imageUrls: [],
  other: [],
  volume: 0,  
}

export enum PRODUCT_ACTION_TYPES {
  FETCH_PRODUCT_LIST = 'FETCH_PRODUCT_LIST',
  FETCH_PRODUCT = 'FETCH_PRODUCT',
}
