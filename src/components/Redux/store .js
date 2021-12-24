import { configureStore } from '@reduxjs/toolkit';
import { customMiddlewareLogger } from './middlewear/logger';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import contactsReducer from './Contacts/contactsSlice';

const persistContactsConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};

const store = configureStore({
  reducer: {
    contacts: persistReducer(persistContactsConfig, contactsReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(customMiddlewareLogger),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
