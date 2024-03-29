import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import { DrawerNavigation } from "./RootStack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { isLogedIn } from "../redux/action/userAction";
import UserSetting from "../screens/UserSetting";
import CameraScreen from "../screens/CameraScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLogedIn());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeStack" component={DrawerNavigation} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="UserSetting" component={UserSetting} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
