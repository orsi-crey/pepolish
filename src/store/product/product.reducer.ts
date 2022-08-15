import { ProductAction } from './product.action';
import { PRODUCT_ACTION_TYPES } from './product.types';


const INITIAL_STATE = {
  productList: []
};

export const productReducer = (state = INITIAL_STATE, action = {} as ProductAction) => {
  const { type, payload } = action;

  switch (type) {
  case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_LIST:
    return {
      ...state,
      productList: payload
    };

  default:
    return state;
  }
};