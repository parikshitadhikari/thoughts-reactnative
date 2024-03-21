import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadCredentials } from "../slices/authSlice";

const HomePage = ({ navigate }) => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    dispatch(loadCredentials())
  }, [dispatch])

  return (
    <View style={styles.container}>
      {userInfo ? <Text>{userInfo.name}</Text> : <Text>HomePage</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});

export default HomePage;
