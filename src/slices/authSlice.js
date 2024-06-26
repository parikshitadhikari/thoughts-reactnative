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
    logout: (state) => {
      state.userInfo = null
      AsyncStorage.removeItem("userInfo")
    }
  },
});

export const loadCredentials = () => async (dispatch) => {
  try {
    const userInfoJSON = await AsyncStorage.getItem("userInfo");
    const userInfo = userInfoJSON ? JSON.parse(userInfoJSON) : null;
    dispatch(setCredentials(userInfo)); // Dispatching a synchronous action to update the state
  } catch (error) {
    console.error("Error loading user:", error);
  }
};

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
