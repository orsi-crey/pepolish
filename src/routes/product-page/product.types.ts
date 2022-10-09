import { DocumentData } from 'firebase/firestore';
import { mutationResult } from '../../utils/firestore/firestore.utils';

export type ProductButtonProps = {
  editable: boolean;
  seteditable: (v: boolean) => void;
  onSaveClicked: () => void;
  onCancelClicked: () => void;
  mutation: mutationResult | undefined;
};

export type ProductTableProps = {
  product: DocumentData;
  productId: string | undefined;
  editable: boolean;
  setproduct: (v: DocumentData) => void;
};