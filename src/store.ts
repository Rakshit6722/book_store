import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist"
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./services/slice/rootReducer";

const persistConfig = {
    key: 'root',
    storage,
}

const perristedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: perristedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);