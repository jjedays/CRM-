import {
  DocumentData,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../configs/firebase";

export function editUserDocument(userId: string): Promise<void>;
export function editUserDocument(
  userId: string,
  age: number,
  displayName: string,
  bio: string
): Promise<void>;
export async function editUserDocument(
  userId: string,
  age?: number,
  displayName?: string,
  bio?: string
) {
  const userData = await getUserDocument(userId);
  if (age && displayName && bio) {
    return await setDoc(doc(db, "user", userId), {
      ...userData,
      age,
      displayName,
      bio,
    });
  }

  return await setDoc(doc(db, "user", userId), { ...userData, user: userId });
}

export const getUserDocument = async (userId: string) => {
  let res = {} as DocumentData;
  const querySnapshot = await getDocs(collection(db, "user"));
  querySnapshot.forEach((doc) => {
    if (doc.id === userId) {
      res = doc.data();
    }
  });
  return res;
};
