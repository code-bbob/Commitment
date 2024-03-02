import { createSlice } from "@reduxjs/toolkit";

function isAccess(){
  if (localStorage.getItem('accessToken') != null){
    return true;
  }
  else {
    return false;
  }
}
const initialState = {
  isAuthenticated: isAccess(),  
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
