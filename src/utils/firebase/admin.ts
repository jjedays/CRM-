import {
  DocumentData,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
import { getUserDocument } from "./user";
import { Role } from "../../types/role";

export const getAllUserDocuments = async () => {
  const res = [] as DocumentData[];
  const querySnapshot = await getDocs(collection(db, "user"));
  querySnapshot.forEach((doc) => {
    res.push({ ...doc.data(), user: doc.id });
  });
  return res;
};

export const setUserRole = async (user: string, role: Role) => {
  const userData = await getUserDocument(user);
  delete userData.user;
  return await setDoc(doc(db, "user", user), {
    ...userData,
    role,
  });
};
