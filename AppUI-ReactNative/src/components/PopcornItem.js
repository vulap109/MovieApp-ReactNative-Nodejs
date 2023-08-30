import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Feather";

const PopcornItem = ({ data }) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(data.amount);
  }, []);

  const btnChangeAmount = (mode = 0) => {
    if (!amount) {
      setAmount(0);
    }
    if (mode === 1) {
      setAmount(+amount + 1);
    } else {
      if (amount <= 0) {
        return;
      }
      setAmount(+amount - 1);
    }
  };

  return (
    <View className="flex-row m-2 bg-white rounded-lg">
      <View className="p-2">
        <Image
          source={require("../assets/images/drawer/combo.png")}
          style={{ width: 80, height: 80 }}
        />
      </View>
      <View>
        <View className="flex-1">
          <Text className="text-lg font-semibold">{data.comboTitle}</Text>
          <Text>{data.detail}</Text>
        </View>
        <View className="flex-row items-center pb-1" style={{ bottom: 0 }}>
          <Ionicons
            name="minus-circle"
            size={22}
            color={amount == 0 ? "grey" : "black"}
            onPress={() => btnChangeAmount(0)}
          />
          <Text className="px-2 text-lg">{amount}</Text>
          <Ionicons
            name="plus-circle"
            size={22}
            onPress={() => btnChangeAmount(1)}
          />
        </View>
      </View>
    </View>
  );
};

export default PopcornItem;
