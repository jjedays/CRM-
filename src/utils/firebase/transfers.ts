import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
import { IUser } from "../../models/user";
import { v4 as uuidv4 } from "uuid";

export const addTransferDocument = async (
  dispatch: IUser,
  driver: IUser,
  passengers: IUser[],
  destination: string,
  startPoint: string
) => {
  const userCollection = collection(db, "user");
  return await setDoc(doc(db, "transfer", uuidv4()), {
    dispatch: doc(userCollection, dispatch.user),
    driver: doc(userCollection, driver.user),
    passengers: passengers.map((passenger) =>
      doc(userCollection, passenger.user)
    ),
    destination,
    startPoint,
  });
};

export const deleteTransferDocument = async (id: string) => {
  return await deleteDoc(doc(db, "transfer", id));
};

export const getAllTransferDocuments = async () => {
  const res = [] as DocumentData[];
  const querySnapshot = await getDocs(collection(db, "transfer"));
  querySnapshot.forEach((doc) => {
    res.push({ ...doc.data(), transferId: doc.id });
  });
  return res;
};
