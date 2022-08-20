import {
  ActionWithPayload,
  createAction,
} from '../../utils/reducer/reducer.utils';
import { Polish, PRODUCT_ACTION_TYPES } from './product.types';

export type FetchProductList = ActionWithPayload<
  PRODUCT_ACTION_TYPES.FETCH_PRODUCT_LIST,
  Polish[] | null
>;

export type FetchProduct = ActionWithPayload<
  PRODUCT_ACTION_TYPES.FETCH_PRODUCT,
  Polish[]
>;

export type ProductAction = FetchProductList | FetchProduct;

export const fetchProductList = (
  productList: Polish[] | null
): FetchProductList =>
  createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCT_LIST, productList);

export const fetchProduct = (product: Polish): FetchProduct =>
  createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCT, [product]);
