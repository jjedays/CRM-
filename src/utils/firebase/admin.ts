import {
  DocumentData,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
import { getUserDocument } from "./user";

export const getAllUserDocuments = async () => {
  let res = [] as DocumentData[];
  const querySnapshot = await getDocs(collection(db, "user"));
  querySnapshot.forEach((doc) => {
    res.push(doc.data());
  });
  return res;
};

export const setUserRole = async (
  userId: string,
  role: "Driver" | "Passenger" | "Dispatch"
) => {
  const user = await getUserDocument(userId);
  return await setDoc(doc(db, "user", userId), {
    ...user,
    role,
  });
};
