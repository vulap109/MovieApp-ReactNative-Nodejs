import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import { Image } from "react-native";
import ListMovies from "../screens/ListMovies";
import { HomeStackScreen } from "./RootStack";

const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "#ED2B2A",
          drawerActiveTintColor: "#FFF",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -20,
          },
          drawerPosition: "right",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={30} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Movies"
          component={ListMovies}
          options={{
            drawerIcon: ({ color }) => (
              <Image
                source={require("../assets/images/drawer/movies.png")}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Ticket"
          component={ListMovies}
          options={{
            drawerIcon: ({ color }) => (
              <Image
                source={require("../assets/images/drawer/tickets.png")}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Cinema"
          component={ListMovies}
          options={{
            drawerIcon: ({ color }) => (
              <Image
                source={require("../assets/images/drawer/cinema.png")}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Promotion"
          component={ListMovies}
          options={{
            drawerIcon: ({ color }) => (
              <Image
                source={require("../assets/images/drawer/coupons.png")}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Gift"
          component={ListMovies}
          options={{
            title: "Gift shop",
            drawerIcon: ({ color }) => (
              <Image
                source={require("../assets/images/drawer/gift-voucher.png")}
                style={{ width: 30, height: 30 }}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
