import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAddThoughtMutation } from "../slices/thoughtApiSlice";
import { loadCredentials } from "../slices/authSlice";

const WriteThoughtPage = () => {
  const [thought, setThought] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const token = userInfo.token;
  const dispatch = useDispatch();
  const [addThought, { isLoading }] = useAddThoughtMutation();

  useEffect(() => {
    dispatch(loadCredentials());
  }, [dispatch]);

  const handleSubmit = async () => {
    // console.log(userId);
    // try {
    //     const res = await addThought({ text: thought, userId }, {
    //   }).unwrap();
    //   console.log("res: ", res);
    // } catch (error) {
    //   console.log(error);
    // }

    // setThought("");
  };

  return (
    <View style={{ alignItems: "center", width: "100%", paddingTop: 20 }}>
      <MaterialCommunityIcons name="brain" size={100} color="black" />
      <TextInput
        style={{
          borderColor: "black",
          padding: 10,
          borderWidth: 1,
          margin: 10,
          height: 100,
          width: "90%",
        }}
        placeholder="Write a Thought..."
        multiline={true}
        value={thought}
        onChangeText={(text) => {
          setThought(text);
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          width: 100,
          padding: 10,
          borderRadius: 10,
          margin: "auto",
        }}
        onPress={handleSubmit}
      >
        <Text style={{ textAlign: "center", color: "white", fontWeight: 900 }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WriteThoughtPage;
