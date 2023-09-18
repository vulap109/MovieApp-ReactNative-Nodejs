import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreen from "../components/HeaderScreen";

const UpdateSoon = () => {
  return (
    <SafeAreaView className="bg-red-600 flex-1">
      {/* Header screen */}
      <View className="bg-white flex-1">
        <HeaderScreen title="Update soon" />
        <View>
          <Text className="text-center mt-2">
            this screen will update soon!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateSoon;
