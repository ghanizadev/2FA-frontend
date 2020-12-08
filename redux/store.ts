import {
  createSlice,
  configureStore,
  getDefaultMiddleware,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "./types/User";

const slice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: "",
      email: "",
      avatar: "",
    },
    isLogged: false,
    expiresIn: 0,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setExpiresIn: (state, action: PayloadAction<number>) => {
      state.expiresIn = action.payload;
    },
    logout: (state) => {
      state.user = {
        name: "",
        email: "",
        avatar: "",
      };
      state.isLogged = false;
      state.expiresIn = 0;
    },
  },
});

export const actions = slice.actions;

export const store = configureStore({
  reducer: slice.reducer,
  middleware: [...getDefaultMiddleware({ immutableCheck: false })],
});
