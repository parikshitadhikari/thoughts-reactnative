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

const LoginPage = () => {
  const onRegisterPress = () => {
    console.log("onRegisterPress");
  };

  return (
    <View style={styles.container}>
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
        <Text style={{ color: "white", fontWeight: "900" }}>Login</Text>
      </TouchableOpacity>
      <Pressable style={styles.noaccount} onPress={onRegisterPress}>
        <Text>Don't have an account? Create one</Text>
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

export default LoginPage;
