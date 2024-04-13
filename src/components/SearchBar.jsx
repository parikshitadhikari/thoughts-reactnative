import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const SearchBar = ({ data, onSearch }) => {
  const [searchText, setSearchText] = useState();

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredThoughts = data.filter((thought) => {
      return thought.text.toLowerCase().includes(text.toLowerCase());
    });
    onSearch(filteredThoughts);
  };

  return (
    <TextInput
      style={styles.textInput}
      placeholder="Search thougths"
      value={searchText}
      onChangeText={(text) => {
        handleSearch(text);
      }}
    />
  );
};
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  },
});
export default SearchBar;
