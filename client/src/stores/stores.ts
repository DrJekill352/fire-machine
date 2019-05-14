import { createContext, useContext } from 'react';
import { RouterStore } from 'mobx-react-router';

import { AuthStore } from './auth.store';

const routerStore = new RouterStore();
const authStore = new AuthStore();

const stores = Object.freeze({
  routerStore,
  authStore,
});

const StoreContext = createContext(stores);

export const useStore = () => {
  return useContext(StoreContext);
};
