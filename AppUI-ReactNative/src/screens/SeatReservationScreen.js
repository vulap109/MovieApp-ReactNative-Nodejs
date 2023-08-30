import { View, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderScreen from "../components/HeaderScreen";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import SeatsComponent from "../components/SeatsComponent";
import TotalComponent from "../components/TotalComponent";

const SeatReservationScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [numberSeat, setNumberSeat] = useState("0");
  const [totalData, setTotalData] = useState({
    name: "Name",
    sub: "2D Vietnam sub",
    total: 0,
    detail: "",
  });

  const handleNavigate = () => {
    navigation.navigate("Popcorn");
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1 mt-6">
      {/* Header screen */}
      <HeaderScreen title="Seats" />

      <View className="flex-1">
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
            <SeatsComponent />
          </ReactNativeZoomableView> */}
        <SeatsComponent />
      </View>
      <TotalComponent
        data={totalData}
        btnTitle={"Book now"}
        handleBtnTotal={handleNavigate}
      />
    </SafeAreaView>
  );
};

export default SeatReservationScreen;
