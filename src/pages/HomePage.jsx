import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadCredentials } from "../slices/authSlice";
import { useGetAllThoughtQuery } from "../slices/thoughtApiSlice";
import ThoughtList from "../components/ThoughtList";
import { Ionicons } from "@expo/vector-icons";
import WriteThoughtPage from "./WriteThoughtPage";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isFetching, isError } = useGetAllThoughtQuery();

  useEffect(() => {
    dispatch(loadCredentials());
  }, [dispatch]);

  const handleCreate = () => {
    userInfo
      ? navigation.push("WriteThought")
      : navigation.replace("MainTabs", { screen: "Login" });
  };

  let content;
  if (isFetching) {
    content = <Text>Loading...</Text>;
  } else if (!data || data.length === 0) {
    content = <Text>No thoughts available</Text>;
  } else if (isError) {
    content = <Text>Error loading thoughts</Text>;
  } else {
    console.log(typeof data)
    content = data.map((thought) => {
      return (
        <ThoughtList key={thought._id} thought={thought} userInfo={userInfo} />
      );
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/*userInfo ? <Text>{userInfo.name}</Text> : <Text>HomePage</Text>*/}
        <View style={styles.viewContainer}>{content}</View>
      </ScrollView>
      <TouchableOpacity
        style={styles.createBtn}
        activeOpacity={0.9}
        onPress={handleCreate}
      >
        <Ionicons name="pencil" size={16} color="white" />
        <Text style={{ color: "white" }}>Write a thought..</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8e4e3",
  },
  viewContainer: {
    padding: 20,
  },
  createBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4636d9",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    gap: 5,
  },
});

export default HomePage;
