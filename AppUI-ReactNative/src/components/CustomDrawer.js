import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { userState } = useSelector((state) => state.user);

  const handleLogOut = () => {
    navigation.navigate("Home");
  };

  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <View className="flex-row mb-2">
          <View className="flex-1 justify-end items-center">
            <Ionicons name="notifications" size={30} />
          </View>
          <View className="flex-1 items-center">
            {userState.auth ? (
              <Image
                source={require("../assets/images/castImage1.png")}
                style={{ width: 100, height: 100 }}
                className="rounded-full"
              />
            ) : (
              <Image
                source={require("../assets/images/drawer/user.png")}
                style={{ width: 100, height: 100 }}
                className="rounded-full"
              />
            )}
          </View>
          <View className="flex-1 justify-end items-center">
            <Ionicons name="settings" size={30} />
          </View>
        </View>
        <View className="mb-3">
          {userState.auth ? (
            <>
              <Text className="text-center">Keanu Reeves</Text>
              <Text className="text-center">Member</Text>
            </>
          ) : (
            <TouchableWithoutFeedback>
              <Text className="text-center text-red-800">Login/Register</Text>
            </TouchableWithoutFeedback>
          )}
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {userState.auth ? (
        <TouchableOpacity onPress={() => handleLogOut()}>
          <View className="border-t-2 py-3 px-5 border-t-gray-500 flex-row items-center">
            <Ionicons name="log-out-outline" size={20} />
            <Text className="pl-2">Log Out</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View className="border-t-2 py-3 px-5 border-t-gray-500 flex-row items-center">
            <Ionicons name="log-in-outline" size={20} />
            <Text className="pl-2">Log In</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomDrawer;
