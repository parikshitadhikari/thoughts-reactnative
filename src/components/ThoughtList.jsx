import React, { useState } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useDeleteThoughtMutation } from "../slices/thoughtApiSlice";
import { useEditThoughtMutation } from "../slices/thoughtApiSlice";

const ThoughtList = ({ thought, userInfo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState(thought.text);
  const [deleteThought] = useDeleteThoughtMutation();
  const [editThought] = useEditThoughtMutation();

  const handleEdit = () => {
    if (!userInfo) {
      Alert.alert("Login to edit your thoughts");
    } else {
      if (thought.userId._id !== userInfo._id) {
        Alert.alert("Unauthorized");
      } else {
        setModalVisible(!modalVisible);
      }
    }
  };

  const handleEditSubmit = async () => {
    setModalVisible(!modalVisible);
    try {
      const token = userInfo.token;
      await editThought({
        data: { text }, // text: text
        thoughtId: thought._id,
        token,
      }).unwrap();
      Alert.alert("Successfully edited thought");
    } catch (err) {
      console.log(err);
      Alert.alert(err?.data?.message || err.error || "Error");
    }
  };

  const handleDelete = async () => {
    if (!userInfo) {
      Alert.alert("Login to delete your thoughts");
    } else {
      try {
        const token = userInfo.token;
        await deleteThought({
          thoughtId: thought._id,
          token,
        }).unwrap();
        Alert.alert("Successfully deleted thought");
      } catch (err) {
        Alert.alert(err?.data?.message || err.error);
      }
    }
  };
  // <Text>{userInfo.name}</Text>
  return (
    <View>
      <View style={styles.container}>
        <Text>{thought.text}</Text>
        <View style={styles.iconsView}>
          <Text style={styles.writtenBy}>
            {thought.userId.name === userInfo.name
              ? "You"
              : thought.userId.name}{" "}
            - {thought.createdAt.slice(0, 10)}
          </Text>
          <Feather
            name="edit"
            size={20}
            color="blue"
            suppressHighlighting={true}
            onPress={handleEdit}
          />
          <Feather
            name="trash-2"
            size={20}
            color="red"
            suppressHighlighting={true}
            onPress={handleDelete}
          />
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Entypo
              style={styles.modalClose}
              name="cross"
              size={24}
              color="black"
              suppressHighlighting={true}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
            <TextInput
              style={styles.textInput}
              value={text}
              onChangeText={(text) => {
                setText(text);
              }}
              multiline={true}
            />
            <Pressable style={styles.button} onPress={handleEditSubmit}>
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    flexDirection: "column-reverse",
    gap: 5,
  },
  iconsView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  writtenBy: {
    width: "80%",
    color: "#4f4e4d",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    width: "80%",
  },
  modalClose: {
    marginBottom: 10,
    marginLeft: "auto",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    maxHeight: 300,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    elevation: 2,
    marginTop: 10,
    backgroundColor: "#2196F3",
  },
  editText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default ThoughtList;
