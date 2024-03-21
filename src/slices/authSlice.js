import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      AsyncStorage.setItem("userInfo", JSON.stringify(action.payload))
        .then(() => console.log("User successfully saved"))
        .catch((err) => console.error("Error saving user: ", err));
    },
  },
});
export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
