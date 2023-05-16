import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  mode : "dark",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setMode: (state) => {
      if(state.mode === 'light'){
        state.mode = "dark";
      }else{
        state.mode = 'light';
      }
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;;
    },
  },
});

export const { setLogin, setLogout, setMode, setUser } = authSlice.actions;
export default authSlice.reducer;