import { User } from "firebase/auth";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../configs/firebase";

export function editUserDocument(user: User): Promise<void>;
export function editUserDocument(
  user: User,
  age: number,
  displayName: string,
  location: [number, number]
): Promise<void>;
export async function editUserDocument(
  user: User,
  age?: number,
  displayName?: string,
  location?: [number, number]
) {
  if (age && displayName && location) {
    return await setDoc(doc(db, "user", user.uid), {
      age,
      displayName,
      location,
    });
  }

  return await setDoc(doc(db, "user", user.uid), {});
}

export const getUserDocument = async (user: User) => {
  let res = {} as DocumentData;
  const querySnapshot = await getDocs(collection(db, "user"));
  querySnapshot.forEach((doc) => {
    if (doc.id === user.uid) {
      res = doc.data();
    }
  });
  return res;
};
