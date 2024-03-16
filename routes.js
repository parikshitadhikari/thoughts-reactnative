import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./src/pages/HomePage";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Login") {
              iconName = focused ? "log-in" : "log-in-outline";
            }

            return <Ionicons name={iconName} size={24} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Login" component={LoginPage} />
      </Tab.Navigator>
      
    </>
  );
};

export default Routes;
