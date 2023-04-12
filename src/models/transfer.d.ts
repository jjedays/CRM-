import { DocumentReference, DocumentData } from "firebase/firestore";

export interface ITransfer {
  destination: string;
  passengers: DocumentReference<DocumentData>[];
  dispatch: DocumentReference<DocumentData>;
  driver: DocumentReference<DocumentData>;
  startPoint: string;
  transferId: string;
}
