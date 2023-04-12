import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
import { IUser } from "../../models/user";

export function editUserDocument(user: string): Promise<void>;
export function editUserDocument(
  user: string,
  age: number,
  displayName: string,
  bio: string
): Promise<void>;
export async function editUserDocument(
  user: string,
  age?: number,
  displayName?: string,
  bio?: string
) {
  const userData = await getUserDocument(user);
  delete userData.user;
  if (age && displayName && bio) {
    return await setDoc(doc(db, "user", user), {
      ...userData,
      age,
      displayName,
      bio,
    });
  }

  return await setDoc(doc(db, "user", user), { ...userData });
}

export const getUserDocument = async (user: string) => {
  let res = {} as DocumentData;
  const querySnapshot = await getDocs(collection(db, "user"));
  querySnapshot.forEach((doc) => {
    if (doc.id === user) {
      res = { ...doc.data(), user: doc.id };
    }
  });
  return res;
};

export const getUsersByRole = (
  users: IUser[],
  role: "Driver" | "Passenger" | "Dispatch"
) => {
  return users.filter((user) => user.role === role);
};
