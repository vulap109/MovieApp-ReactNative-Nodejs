import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderScreen from "../components/HeaderScreen";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import SeatsComponent from "../components/SeatsComponent";
import TotalComponent from "../components/TotalComponent";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTotalData } from "../redux/action/cinemaAction";
import { totalMovieMoney } from "../utils/format";
import { SafeAreaView } from "react-native-safe-area-context";

const SeatReservationScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [numberSeat, setNumberSeat] = useState("0");
  const [totalD, setTotalD] = useState({});
  const { screen, movie, totalData } = useSelector((state) => state.cinema);
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigation.navigate("Popcorn");
    dispatch(UpdateTotalData(totalD));
  };

  useEffect(() => {
    caculator();
  }, [screen, movie]);

  const caculator = () => {
    let totalTmp = {
      ...totalData,
    };
    if (screen && screen.seatSelected && screen.seatSelected.length > 0) {
      totalTmp.detail =
        screen.seatSelected.length +
        (screen.seatSelected.length === 1 ? " seat" : " seats");
    } else {
      totalTmp.detail = "";
    }
    if (screen && screen.seatSelected) {
      // screen.seatSelected.map((item) => {
      //   let row = item.seat.slice(0, 1);
      //   if (seatVIP.includes(row)) {
      //     totalTmp.total += 90000;
      //   } else if (row === "K") {
      //     totalTmp.total += 120000;
      //   } else {
      //     totalTmp.total += 75000;
      //   }
      // });
      totalTmp.total = totalMovieMoney(screen.seatSelected);
    }

    console.log("check seat selected: ", totalTmp);
    setTotalD(totalTmp);
  };

  return (
    <SafeAreaView className="bg-red-600 flex-1">
      {/* Header screen */}
      <View className="bg-neutral-800">
        <HeaderScreen title="Seats" />
      </View>

      <View className="flex-1 bg-neutral-800">
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
        data={totalD}
        btnTitle={"Book now"}
        handleBtnTotal={handleNavigate}
      />
    </SafeAreaView>
  );
};

export default SeatReservationScreen;
