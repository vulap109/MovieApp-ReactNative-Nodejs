import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateAvatar } from "../services/userService";
import { isLogedIn } from "../redux/action/userAction";
import { useNavigation } from "@react-navigation/core";

const { width, height } = Dimensions.get("window");

const CameraScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const { userState } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");
      console.log("check permission: ", cameraStatus);
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(">>> data picture: ", data);
        setImage(data);
      } catch (error) {
        console.log(">>> take picture error: ", error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image.uri);
        console.log("check user state: ", userState);

        let res = await userUpdateAvatar(userState.access_token, image.uri);
        console.log(">> res save picture: ", res);
        if (res.result) {
          setImage(null);
          dispatch(isLogedIn());
          navigation.goBack();
        } else {
          Alert.alert("Update image have an error.");
        }
      } catch (error) {
        console.log("save Picture error: ", error);
      }
    }
  };

  if (cameraPermission === false) {
    return (
      <Text className="items-center justify-center">No access to camera</Text>
    );
  }

  return (
    <SafeAreaView className="bg-neutral-700 flex-1">
      <View className="flex-1">
        {!image ? (
          <>
            <View className="h-20"></View>
            <Camera
              style={styles.camera}
              type={cameraType}
              ref={cameraRef}
            ></Camera>
            <View className="h-36 items-center justify-center">
              <TouchableOpacity
                className="rounded-full h-20 w-20 bg-white border border-yellow-400"
                onPress={takePicture}
              ></TouchableOpacity>
            </View>
          </>
        ) : (
          <View className="flex-1">
            <View className="m-4 flex-row justify-between">
              <TouchableWithoutFeedback onPress={() => setImage(null)}>
                <View className="flex-row items-center ">
                  <Ionicons
                    name="chevron-back-sharp"
                    size={30}
                    color={"white"}
                  />
                  <Text className="text-white text-base">Back</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={savePicture}>
                <View className="flex-row items-center ">
                  <Ionicons
                    name="checkmark-outline"
                    size={30}
                    color={"white"}
                  />
                  <Text className="text-white text-base">Save</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View className="mt-12 flex-1">
              <Image
                source={{ uri: image.uri }}
                style={{ height: height - 224, width: width }}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    borderRadius: 20,
  },
});

export default CameraScreen;
