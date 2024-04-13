import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDeleteThoughtMutation } from "../slices/thoughtApiSlice";

const ThoughtList = ({ thought, userInfo }) => {
  const [deleteThought] = useDeleteThoughtMutation();

  const handleDelete = async () => {
    if (!userInfo) {
      alert("Login to delete your thoughts");
    } else {
      try {
        const token = userInfo.token;
        await deleteThought({
          thoughtId: thought._id,
          token,
        }).unwrap();
        alert("Successfully deleted thought");
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };
  // <Text>{userInfo.name}</Text>
  return (
    <View style={styles.container}>
      <Text>{thought.text}</Text>
      <Feather name="trash-2" size={20} color="red" onPress={handleDelete} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c7bfbf",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: 0.5,
    shadowOpacity: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default ThoughtList;
