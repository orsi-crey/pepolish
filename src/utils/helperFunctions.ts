import { DocumentData } from 'firebase/firestore';
import { ProductData } from '../routes/bottle-page/bottle.types';

// ---------- things related to users ----------
export const getDisplayName = (userList: Map<string, DocumentData> | undefined, userId: string): string => {
  return userList?.get(userId)?.displayName || '';
};

export const getUserIdByDisplayname = (userList: Map<string, DocumentData> | undefined, displayName: string): string => {
  if (userList) {
    for (const userId of Array.from(userList?.keys())) {
      if (userList.get(userId)?.displayName === displayName) {
        return userId;
      }
    }
  }
  return '';
};

export const getAllDisplaynames = (userList: Map<string, DocumentData> | undefined): string[] => {
  const displayNames = new Set<string>();
  userList?.forEach((user) => {
    displayNames.add(user?.displayName);
  });
  return Array.from(displayNames) || [];
};

// ---------- things related to products ----------
export const getProductBrand = (productList: Map<string, DocumentData> | undefined, productId: string): string => {
  return productList?.get(productId)?.brand || '';
};

export const getProductName = (productList: Map<string, DocumentData> | undefined, productId: string): string => {
  return productList?.get(productId)?.name || '';
};

export const getProductBrandAndName = (productList: Map<string, DocumentData> | undefined, productId: string): string => {
  return `${productList?.get(productId)?.brand} - ${productList?.get(productId)?.name}`;
};

export const getAllBrands = (productList: Map<string, DocumentData> | undefined): string[] => {
  const brands = new Set<string>();
  productList?.forEach((product) => {
    brands.add(product.brand);
  });
  return Array.from(brands) || [];
};

export const getNamesOfBrand = (productList: Map<string, DocumentData> | undefined, brand: string): string[] => {
  const namesOfBrand = new Set<string>();
  productList?.forEach((product) => {
    if (product.brand === brand) namesOfBrand.add(product.name);
  });
  return Array.from(namesOfBrand) || [];
};

export const getProductIdByProductData = (productList: Map<string, DocumentData> | undefined, productData: ProductData): string => {
  if (productList) {
    for (const productId of Array.from(productList?.keys())) {
      const product = productList.get(productId);
      if (product?.brand === productData?.brand && product?.name === productData?.name) {
        return productId;
      }
    }
  }
  return '';
};
