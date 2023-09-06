import { View, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderScreen from "../components/HeaderScreen";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import SeatsComponent from "../components/SeatsComponent";
import TotalComponent from "../components/TotalComponent";
import { useSelector } from "react-redux";

const SeatReservationScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [numberSeat, setNumberSeat] = useState("0");
  const [totalData, setTotalData] = useState({});
  const { screen, movie } = useSelector((state) => state.cinema);
  const seatVIP = ["D", "E", "F", "G", "H", "I", "J"];

  const handleNavigate = () => {
    navigation.navigate("Popcorn");
  };

  useEffect(() => {
    caculator();
  }, [screen, movie]);

  const caculator = () => {
    let totalData = {
      name: movie.title,
      sub: screen.type,
      total: 0,
      detail: "",
    };
    if (screen.seatSelected.length > 0) {
      totalData.detail =
        screen.seatSelected.length +
        (screen.seatSelected.length === 1 ? " seat" : " seats");
    } else {
      totalData.detail = "";
    }
    screen.seatSelected.map((item) => {
      let row = item.seat.slice(0, 1);
      if (seatVIP.includes(row)) {
        totalData.total += 90000;
      } else if (row === "K") {
        totalData.total += 120000;
      } else {
        totalData.total += 75000;
      }
    });
    console.log("check seat selec ", totalData);
    setTotalData(totalData);
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
