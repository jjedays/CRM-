import { StoreModel } from "./types";
import { createStore, action, persist } from "easy-peasy";

export const store = createStore<StoreModel>(
  persist(
    {
      user: null,
      login: action((state, payload) => {
        state.user = payload;
      }),
      logout: action((state) => {
        state.user = null;
      }),
    },
    {
      storage: "localStorage",
    }
  )
);
