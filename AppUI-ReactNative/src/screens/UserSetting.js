import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreen from "../components/HeaderScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { isLogedIn } from "../redux/action/userAction";
import { userUpdateAvatar } from "../services/userService";

const UserSetting = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { userState } = useSelector((state) => state.user);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const dispatch = useDispatch();

  const handleSelectImage = () => {
    setModalVisible(true);
  };

  const handleOpenCamera = () => {
    navigation.navigate("Camera");
    setModalVisible(false);
  };

  const handleOpenGallery = async () => {
    try {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === "granted");
      console.log("check permission: ", galleryStatus);

      if (galleryStatus.status === "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 5],
          quality: 1,
        });

        console.log("result gallery: ", result.assets[0].uri);
        if (!result.canceled) {
          let res = await userUpdateAvatar(
            userState.access_token,
            result.assets[0].uri
          );
          console.log(">> res save picture: ", res);
          if (res.result) {
            dispatch(isLogedIn());
          } else {
            Alert.alert("Update image have an error.");
          }
        }

        setModalVisible(false);
      } else {
        Alert.alert("No access to gallery.");
      }
    } catch (error) {
      console.log("open gallery error: ", error);
    }
  };

  return (
    <SafeAreaView className="bg-red-600 flex-1 relative">
      {/* Header screen */}
      <View className="bg-white flex-1">
        <HeaderScreen title="My Account" />
        <View>
          <View className="items-center mt-3 relative">
            {/* <Image
              source={require("../assets/images/castImage1.png")}
              style={{ width: 160, height: 160 }}
              className="rounded-full"
            /> */}
            {userState.avatarImg ? (
              <Image
                source={{ uri: userState.avatarImg }}
                style={{ width: 160, height: 160 }}
                className="rounded-full"
              />
            ) : (
              <Image
                source={require("../assets/images/drawer/user.png")}
                style={{ width: 160, height: 160 }}
                className="rounded-full"
              />
            )}
            <View style={{ width: 160, height: 160 }} className="absolute">
              <View
                className="border-2 border-red-600 rounded-full items-center justify-center absolute bottom-1 right-1 bg-white"
                style={{ width: 33, height: 33 }}
              >
                <TouchableOpacity onPress={handleSelectImage}>
                  <Ionicons
                    name="camera-outline"
                    size={23}
                    color="rgb(220 38 38)"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-center text-xl pt-2 font-semibold">
              {userState.fullName}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        className="border-t border-red-600"
      >
        <View className="bg-neutral-200 absolute bottom-0 w-screen">
          <View className="flex-row justify-between p-4">
            <View></View>
            <Text className="text-base text-center">Choice Avatar</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close-outline" size={30} />
            </TouchableOpacity>
          </View>
          <View className="pb-4">
            <TouchableOpacity
              onPress={handleOpenCamera}
              className="border-b border-red-600"
            >
              <View className="flex-row items-center px-4 py-3">
                <Ionicons name="camera-outline" size={30} />
                <Text className="pl-3">Camera</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenGallery} className="">
              <View className="flex-row items-center px-4 py-3">
                <Ionicons name="images-outline" size={27} />
                <Text className="pl-3">Gallery</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserSetting;
