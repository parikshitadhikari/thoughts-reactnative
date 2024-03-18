import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLoginMutation } from "../slices/usersApiSlice";

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const isEmpty = (input) => {
    return input.trim() === "";
  };
  const handlePress = async () => {
    if (isEmpty(email) || isEmpty(password)) {
      alert("Please fill in all fields");
    } else {
      try {
        const res = await login({
          email: email.toLowerCase(),
          password,
        }).unwrap();
        console.log(res);
        console.log("successfull login");
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
      setEmail("");
      setPassword("");
    }
  };
  const onRegisterPress = () => {
    navigation.replace("Register");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter email"
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter password"
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Login</Text>
      </TouchableOpacity>
      <Pressable style={styles.noaccount} onPress={onRegisterPress}>
        <Text>
          Don't have an account?{" "}
          <Text style={{ color: "blue" }}>Create One</Text>
        </Text>
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
