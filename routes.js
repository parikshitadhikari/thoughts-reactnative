import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./src/pages/HomePage";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import WriteThoughtPage from "./src/pages/WriteThoughtPage";
import { TransitionPresets } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import ProfilePage from "./src/pages/ProfilePage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const MainTabs = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Login") {
              iconName = focused ? "log-in" : "log-in-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "people-sharp" : "people-outline";
            }

            return <Ionicons name={iconName} size={24} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        {userInfo ? (
          <Tab.Screen name="Profile" component={ProfilePage} />
        ) : (
          <Tab.Screen name="Login" component={LoginPage} />
        )}
      </Tab.Navigator>
    </>
  );
};
const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen
        name="WriteThought"
        component={WriteThoughtPage}
        options={{ headerBackTitle: "Back" }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
