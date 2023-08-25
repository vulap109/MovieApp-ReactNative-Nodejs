import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const HeaderScreen = (props) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center rounded-b-lg bg-red-600 p-1">
      <StatusBar barStyle={"light-content"} backgroundColor="#222" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color={"#FFF"} />
      </TouchableOpacity>
      <Text className="text-white font-semibold flex-1 text-center text-lg mr-6">
        {props.title}
      </Text>
    </View>
  );
};

export default HeaderScreen;
