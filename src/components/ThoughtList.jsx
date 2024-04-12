import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ThoughtList = ({ thought, userInfo }) => {
  // <Text>{userInfo.name}</Text>
  return (
    <View style={styles.container}>
      <Text>{thought.text}</Text>
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
  },
});
export default ThoughtList;
