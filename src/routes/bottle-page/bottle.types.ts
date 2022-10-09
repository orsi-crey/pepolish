import { DocumentData } from 'firebase/firestore';
import { PolishBottle } from '../product-page/product.types';
import { mutationResult } from '../../utils/firestore/firestore.utils';

export type BottleButtonProps = {
  editable: boolean;
  seteditable: (v: boolean) => void;
  onSaveClicked: () => void;
  onCancelClicked: () => void;
  mutation: mutationResult | undefined;
};

export type BottleTableProps = {
  bottleId: string | undefined;
  bottle: PolishBottle | DocumentData;
  selectedProduct: ProductData;
  selectedUser: string;
  selectedLocationUser: string;
  editable: boolean;
  setbottle: (v: PolishBottle | DocumentData) => void;
  setselectedproduct: (v: ProductData) => void;
  setselecteduser: (v: string) => void;
  setselectedlocationuser: (v: string) => void;
  newBottle: boolean;
};

export type ProductData = {
  brand: string;
  name: string;
};
