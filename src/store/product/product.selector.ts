import { RootState } from '../store';

export const selectProductList = (state: RootState) => state.product.productList;