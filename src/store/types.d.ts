import { User } from "firebase-auth";
import { Action } from "easy-peasy";

interface StoreModel {
  user: User | null;
  login: Action<StoreModel, User>;
  logout: Action<StoreModel>;
}
