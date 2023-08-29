import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderScreen from "../components/HeaderScreen";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import SeatsComponent from "../components/SeatsComponent";

const SeatReservationScreen = () => {
  const { params: item } = useRoute();
  const [numberSeat, setNumberSeat] = useState("0");

  const btnChangeSeats = (mode = 0) => {
    if (!numberSeat) {
      console.log("check number seat: ", numberSeat);
      setNumberSeat("0");
    }
    if (mode === 1) {
      setNumberSeat((+numberSeat + 1).toString());
    } else {
      if (numberSeat <= 0) {
        return;
      }
      setNumberSeat((+numberSeat - 1).toString());
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 mt-6">
      {/* Header screen */}
      <HeaderScreen title="Seats" />
      <View className="bg-yellow-100 p-2 flex-row justify-between items-center">
        <Text>People</Text>
        <View className="flex-row pr-3 items-center">
          <TouchableOpacity onPress={() => btnChangeSeats(0)}>
            <Text className="pr-3 text-lg font-bold">-</Text>
          </TouchableOpacity>
          <TextInput
            className="bg-white text-center"
            onChangeText={(text) => setNumberSeat(text)}
            value={numberSeat}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={() => btnChangeSeats(1)}>
            <Text className="pl-3 text-lg font-bold">+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-slate-400 flex-1">
        {/* <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1.2}
          bindToBorders={true}
          style={{
            padding: 10,
            backgroundColor: "#EEE0C9",
          }}
        >
          <Text>This is the content</Text>
        </ReactNativeZoomableView> */}
        <SeatsComponent />
      </View>
      <View style={{ bottom: 0 }}>
        <Text>Total: </Text>
      </View>
    </SafeAreaView>
  );
};

export default SeatReservationScreen;
