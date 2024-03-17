import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes";
import store from "./src/store";
import { Provider } from "react-redux";
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Routes />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
