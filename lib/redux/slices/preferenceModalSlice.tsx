import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "hide"

export const preferenceModalSlice = createSlice({
  name: 'preferencesModal',
  initialState,
  reducers: {
    showCategory: (state) => { return state = "category" },
    showSources: (state) => { return state = "sources" },
    hide: (state) => { return state = 'hide' }
  }
})

export const { showCategory, showSources, hide } = preferenceModalSlice.actions

export default preferenceModalSlice.reducer