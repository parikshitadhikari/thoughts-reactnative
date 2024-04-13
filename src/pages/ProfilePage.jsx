import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCredentials, logout, setCredentials } from "../slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { EvilIcons } from "@expo/vector-icons";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const ProfilePage = () => {
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const token = userInfo.token;
  const [logoutApiCall] = useLogoutMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    dispatch(loadCredentials());
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [dispatch]);

  const handleLogout = async () => {
    await logoutApiCall(); // for destroying cookie
    dispatch(logout());
    navigation.navigate("Home");
    console.log("Logout");
  };
  const handleNamePenPress = () => {
    setNameEdit(true);
  };
  const handleEmailPenPress = () => {
    setEmailEdit(true);
  };

  const handleSubmit = async () => {
    if (password != confirmPassword) {
      alert("Passwords donot match");
    } else {
      try {
        console.log("Frontend token: ", token);
        const res = await updateUser({
          data: {
            _id: userInfo._id,
            name,
            email,
            password,
          },
          token,
        }).unwrap();
        dispatch(setCredentials({ ...res })); // update the credentials as well
        alert("Profile updated");
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text>Name</Text>
        <View style={styles.inputPenView}>
          <TextInput
            style={styles.textInput}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            editable={true}
          ></TextInput>
          <EvilIcons
            name="pencil"
            size={30}
            color="black"
            suppressHighlighting={true}
            onPress={handleNamePenPress}
          />
        </View>
      </View>
      <View style={styles.inputView}>
        <Text>Email</Text>
        <View style={styles.inputPenView}>
          <TextInput
            style={styles.textInput}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            editable={true}
          ></TextInput>
          <EvilIcons
            name="pencil"
            size={30}
            color="black"
            suppressHighlighting={true}
            onPress={handleEmailPenPress}
          />
        </View>
      </View>
      <View style={styles.inputView}>
        <Text>Password</Text>
        <TextInput
          style={styles.textInput}
          autoComplete="off"
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          placeholder="Enter password"
        />
      </View>
      <View style={styles.inputView}>
        <Text>Confirm Password</Text>
        <TextInput
          style={styles.textInput}
          autoComplete="off"
          autoCorrect={false}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          placeholder="ConfirmPassword"
        />
      </View>
      <TouchableHighlight style={styles.button} onPress={handleSubmit}>
        <Text style={styles.logout}>Submit</Text>
      </TouchableHighlight>
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
    paddingTop: 40,
    alignItems: "center",
  },
  inputView: {
    width: "100%",
    marginBottom: 10,
  },
  inputPenView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    width: "80%",
    padding: 4,
    height: 30,
  },
  button: {
    backgroundColor: "blue",
    padding: 5,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  logout: {
    color: "white",
  },
});
