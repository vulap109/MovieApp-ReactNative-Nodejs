import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderScreen from "../components/HeaderScreen";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import SeatsComponent from "../components/SeatsComponent";
import TotalComponent from "../components/TotalComponent";
import { useDispatch, useSelector } from "react-redux";
import { SeatsSelected, UpdateTotalData } from "../redux/action/cinemaAction";
import { totalMovieMoney } from "../utils/format";
import { SafeAreaView } from "react-native-safe-area-context";

const SeatReservationScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [seatSt, setSeatSt] = useState([]);
  const [totalD, setTotalD] = useState({});
  const { movie, totalData } = useSelector((state) => state.cinema);
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigation.navigate("Popcorn");
    dispatch(UpdateTotalData(totalD));
    dispatch(SeatsSelected(seatSt));
  };

  useEffect(() => {
    caculator();
  }, [seatSt, movie]);

  const caculator = () => {
    let totalTmp = {
      ...totalData,
    };
    if (seatSt && seatSt.length > 0) {
      totalTmp.detail =
        seatSt.length + (seatSt.length === 1 ? " seat" : " seats");
    } else {
      totalTmp.detail = "";
    }
    if (seatSt) {
      totalTmp.total = totalMovieMoney(seatSt);
    }
    setTotalD(totalTmp);
  };
  // seat selected
  const seatSelected = (matrixSeats) => {
    let seatSel = [];
    matrixSeats.map((row) => {
      row.map((col) => {
        if (col.status === 1) {
          // list seats selected
          seatSel.push(col);
        }
      });
    });
    setSeatSt(seatSel);
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
        <SeatsComponent seatSelected={seatSelected} />
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
