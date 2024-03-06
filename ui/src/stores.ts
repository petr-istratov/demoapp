import { createContext, useContext } from "react";
import appStore from "./store/AppStore";

const store = {
  appStore: appStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
