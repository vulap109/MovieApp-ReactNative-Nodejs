import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const TotalComponent = ({ data, btnTitle, handleBtnTotal }) => {
  return (
    <View style={{ bottom: 0 }} className="bg-white flex-row">
      <View style={styles.totalLeft}>
        <Text>{data.name}</Text>
        <Text className="text-gray-400 text-xs pb-2">{data.sub}</Text>
        <Text className="text-base font-medium py-1">
          {data.total} đ <Text className="text-xs">{data.detail}</Text>
        </Text>
      </View>
      <View style={styles.totalRight} className="justify-center">
        <TouchableOpacity activeOpacity={0.6} onPress={handleBtnTotal}>
          <Text className="bg-red-600 rounded-full text-center py-2 text-white mr-2">
            {btnTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalLeft: {
    flex: 5,
    paddingStart: 15,
  },
  totalRight: {
    flex: 2,
  },
});

export default TotalComponent;
