import { View, Text, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomDrawer = (props) => {
  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <View className="flex-row mb-2">
          <View className="flex-1 justify-end items-center">
            <Ionicons name="notifications" size={30} />
          </View>
          <View className="flex-1 items-center">
            <Image
              source={require("../assets/images/castImage1.png")}
              style={{ width: 100, height: 100 }}
              className="rounded-full"
            />
          </View>
          <View className="flex-1 justify-end items-center">
            <Ionicons name="settings" size={30} />
          </View>
        </View>
        <View className="mb-3">
          <Text className="text-center">Keanu Reeves</Text>
          <Text className="text-center">Member</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="border-t-2 py-3 px-5 border-t-gray-500 flex-row items-center">
        <Ionicons name="log-out-outline" size={20} />
        <Text className="pl-2">Sign Out</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
