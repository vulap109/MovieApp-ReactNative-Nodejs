import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreen from "../components/HeaderScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserSetting = () => {
  return (
    <SafeAreaView className="bg-red-600 flex-1">
      {/* Header screen */}
      <View className="bg-white flex-1">
        <HeaderScreen title="My Account" />
        <View>
          <View className="items-center mt-3 relative">
            <Image
              source={require("../assets/images/castImage1.png")}
              style={{ width: 160, height: 160 }}
              className="rounded-full"
            />
            <View style={{ width: 160, height: 160 }} className="absolute">
              <View
                className="border-2 border-red-600 rounded-full items-center justify-center absolute bottom-1 right-1 bg-white"
                style={{ width: 33, height: 33 }}
              >
                <Ionicons
                  name="camera-outline"
                  size={23}
                  color="rgb(220 38 38)"
                />
              </View>
            </View>
            <Text className="text-center text-xl pt-2 font-semibold">
              Keanu Reeves
            </Text>
          </View>
          {/* Account setting */}
          <View className="mt-4">
            {/* <Text className="p-2 pt-4 bg-neutral-400">DISCOUNT PAYMENT</Text> */}
            <View className="flex-row justify-between p-2">
              <View className="flex-row pl-1">
                <Image
                  source={require("../assets/icons/user-info.png")}
                  style={{ width: 28, height: 28 }}
                />
                <Text className="text-base pl-3">Account information</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} />
            </View>
            <View className="flex-row justify-between p-2 border-t  border-stone-400">
              <View className="flex-row pl-1">
                <Image
                  source={require("../assets/icons/change-password.png")}
                  style={{ width: 28, height: 28 }}
                />
                <Text className="text-base pl-3">Change password</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} />
            </View>
            <View className="flex-row justify-between p-2 border-t  border-stone-400">
              <View className="flex-row pl-1">
                <Image
                  source={require("../assets/icons/payment-protection.png")}
                  style={{ width: 28, height: 28 }}
                />
                <Text className="text-base pl-3">Set up payment</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} />
            </View>
            <View className="flex-row justify-between p-2 border-t  border-stone-400">
              <View className="flex-row pl-1">
                <Image
                  source={require("../assets/icons/membership-card.png")}
                  style={{ width: 28, height: 28 }}
                />
                <Text className="text-base pl-3">Member card</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} />
            </View>
          </View>
          {/* space between view */}
          <View className="py-5 bg-neutral-400"></View>

          {/* voucher setting */}
          <View className="">
            {/* <Text className="p-2 pt-4 bg-neutral-400">DISCOUNT PAYMENT</Text> */}
            <View className="flex-row justify-between p-2">
              <View className="flex-row pl-1">
                <Image
                  source={require("../assets/icons/coin.png")}
                  style={{ width: 28, height: 28 }}
                />
                <Text className="text-base pl-3">Points</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} />
            </View>
            <View className="flex-row justify-between p-2 border-t  border-stone-400">
              <View className="flex-row pl-1">
                <Image
                  source={require("../assets/icons/voucher.png")}
                  style={{ width: 28, height: 28 }}
                />
                <Text className="text-base pl-3">Gift | Voucher | coupons</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} />
            </View>
          </View>

          {/* space between view */}
          <View className="py-5 bg-neutral-400"></View>

          {/* language setting */}
          <View className="">
            {/* <Text className="p-2 pt-4 bg-neutral-400">DISCOUNT PAYMENT</Text> */}
            <View className="flex-row justify-between p-2">
              <View className="flex-row pl-1">
                <Image
                  source={require("../assets/icons/global.png")}
                  style={{ width: 28, height: 28 }}
                />
                <Text className="text-base pl-3">Language</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserSetting;
