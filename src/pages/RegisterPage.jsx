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
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const RegisterPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onLoginPress = () => {
    navigation.replace("MainTabs", { screen: "Login" });
  };

  const isEmpty = (input) => {
    return input.trim() === "";
  };

  const handlePress = async () => {
    if (password !== confirmPassword) {
      alert("Passwords donot match");
    } else if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword)
    ) {
      alert("Please fill in all fields");
    } else {
      try {
        const res = await register({
          name,
          email: email.toLowerCase(),
          password,
        }).unwrap();
        dispatch(setCredentials(res))
        navigation.navigate("MainTabs", { screen: "Home" });
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter name"
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />
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
      <TextInput
        style={styles.textInput}
        placeholder="Confirm password"
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Register</Text>
      </TouchableOpacity>
      <Pressable style={styles.noaccount} onPress={onLoginPress}>
        <Text>
          Already have an account? <Text style={{ color: "blue" }}>Login</Text>
        </Text>
      </Pressable>
      {isLoading && <Text>Loading...</Text>}
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
