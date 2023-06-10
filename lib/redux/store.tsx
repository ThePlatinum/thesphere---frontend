import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./slices/authModalSlice";
import authReducer from "./slices/authSlice";
import { baseApi } from "./apis/baseApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    auth: authReducer,

    // APIs
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(baseApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch