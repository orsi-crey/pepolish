import { ActionWithPayload, createAction } from '../../utils/reducer/reducer.utils';
import { Polish, PRODUCT_ACTION_TYPES } from './product.types';

export type FetchProductList = ActionWithPayload<PRODUCT_ACTION_TYPES.FETCH_PRODUCT_LIST, Polish[] | null>

export type ProductAction = FetchProductList

export const fetchProductList = (productList: Polish[] | null): FetchProductList => createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCT_LIST, productList);
