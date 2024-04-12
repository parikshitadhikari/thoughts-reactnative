import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  userInfo: null,
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.token = action.payload.token
      AsyncStorage.setItem("userInfo", JSON.stringify(action.payload))
        .then(() => console.log("User successfully saved"))
        .catch((err) => console.error("Error saving user: ", err));
      console.log(state.userInfo)
    },
    logout: (state) => {
      state.userInfo = null
      state.token = null
      AsyncStorage.removeItem("userInfo")
      console.log(state)
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
