import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => { return state = true },
    logout: (state) => { return state = false }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer