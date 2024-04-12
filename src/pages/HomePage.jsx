import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadCredentials } from "../slices/authSlice";
import { useGetAllThoughtQuery } from "../slices/thoughtApiSlice";
import ThoughtList from "../components/ThoughtList";

const HomePage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const { data, isFetching, isError } = useGetAllThoughtQuery();

  useEffect(() => {
    dispatch(loadCredentials());
  }, [dispatch]);

  let content;
  if (isFetching) {
    content = <Text>Loading...</Text>;
  } else if (!data || data.length === 0) {
    content = <Text>No thoughts available</Text>;
  } else if (isError) {
    content = <Text>Error loading thoughts</Text>;
  } else {
    content = data.map((thought) => {
      return (
        <ThoughtList key={thought._id} thought={thought} userInfo={userInfo} />
      );
    });
  }

  return (
    <ScrollView style={styles.container}>
      {/*userInfo ? <Text>{userInfo.name}</Text> : <Text>HomePage</Text>*/}
      <View style={styles.viewContainer}>{content}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8e4e3",
    marginTop: 30,
  },
  viewContainer: {
    padding: 20,
  },
});

export default HomePage;
