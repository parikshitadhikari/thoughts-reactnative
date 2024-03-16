import React from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";

const RegisterPage = () => {
  const onLoginPress = () => {
    console.warn("onLoginPress");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter name"
        autoComplete="off"
        autoCorrect={false}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter email"
        autoComplete="off"
        autoCorrect={false}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter password"
        autoComplete="off"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={{ color: "white", fontWeight: "900" }}>Register</Text>
      </TouchableOpacity>
      <Pressable style={styles.noaccount} onPress={onLoginPress}>
        <Text>Already have an accoun? Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    width: "80%",
    margin: 1,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  button: {
    backgroundColor: "blue",
    width: "80%",
    margin: 2,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  noaccount: {
    padding: 5,
  },
});

export default RegisterPage;
