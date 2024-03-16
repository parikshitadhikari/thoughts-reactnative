import React from "react";
import { StyleSheet, View, Text } from "react-native";


const HomePage = ({navigate}) => {
  return (
    <View style={styles.container}>
        <Text>HomePage</Text>
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
