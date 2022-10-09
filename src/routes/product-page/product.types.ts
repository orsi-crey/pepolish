import { DocumentData } from "firebase/firestore";
import { mutationResult } from "../../utils/firestore/firestore.utils";

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

export type ProductButtonProps = {
  editable: boolean;
  seteditable: (v: boolean) => void;
  onSaveClicked: () => void;
  onCancelClicked: () => void;
  mutation: mutationResult | undefined;
};

export type ProductTableProps = {
  product: Polish | DocumentData;
  productId: string | undefined;
  editable: boolean;
  setproduct: (v: Polish | DocumentData) => void;
};