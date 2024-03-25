import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { useLogoutMutation } from "../slices/usersApiSlice";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [ logoutApiCall ] = useLogoutMutation()

    const handleLogout = async () => {
          await logoutApiCall() // for destroying cookie
          dispatch(logout());
          navigation.navigate("Home")
          
        console.log("Logout");
      };
  
  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.button} onPress={handleLogout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 5,
    alignSelf: "flex-start",
  },
  logout: {
    color: "white",
  },
});
