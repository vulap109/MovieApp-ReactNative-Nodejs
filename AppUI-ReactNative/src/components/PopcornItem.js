import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get("window");
const PopcornItem = ({ data, btnChangeAmount }) => {
  return (
    <View className="flex-row m-2 bg-white rounded-lg">
      <View className="p-2">
        <Image
          source={require("../assets/images/drawer/combo.png")}
          style={{ width: 80, height: 80 }}
        />
      </View>
      <View className="mr-6" style={{ width: width - 120 }}>
        <View className="flex-1">
          <Text className="text-lg font-semibold">{data.comboName}</Text>
          <Text className="text-xs">{data.description}</Text>
        </View>
        <View className="flex-row items-center pb-1" style={{ bottom: 0 }}>
          <Ionicons
            name="minus-circle"
            size={22}
            color={data.amount == 0 ? "grey" : "black"}
            onPress={() => btnChangeAmount(0, data.id)}
          />
          <Text className="px-2 text-lg">{data.amount}</Text>
          <Ionicons
            name="plus-circle"
            size={22}
            onPress={() => btnChangeAmount(1, data.id)}
          />
        </View>
      </View>
    </View>
  );
};

export default PopcornItem;
