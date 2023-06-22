import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "hide"

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    showLogin: (state) => { return state = "login" },
    showRegister: (state) => { return state = "register" },
    hide: (state) => { return state = 'hide' }
  }
})

export const { showLogin, showRegister, hide } = authModalSlice.actions

export default authModalSlice.reducer