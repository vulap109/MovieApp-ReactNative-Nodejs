import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderScreen from "../components/HeaderScreen";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import SeatsComponent from "../components/SeatsComponent";
import TotalComponent from "../components/TotalComponent";
import { SeatsSelected, UpdateTotalData } from "../redux/action/cinemaAction";
import { totalMovieMoney } from "../utils/format";
import { getOccupiedSeats } from "../services/CinemaService";

const SeatReservationScreen = () => {
  const navigation = useNavigation();
  const [totalD, setTotalD] = useState({});
  const [seatsOccupied, setSeatsOccupied] = useState([]);
  const [seatsSelected, setseatsSelected] = useState([]);
  const [seatTable, setSeatTable] = useState([
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "D1",
    "D2",
    "D3",
    "D4",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
    "D10",
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
    "E6",
    "E7",
    "E8",
    "E9",
    "E10",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "G6",
    "G7",
    "G8",
    "G9",
    "G10",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "H7",
    "H8",
    "H9",
    "H10",
    "I1",
    "I2",
    "I3",
    "I4",
    "I5",
    "I6",
    "I7",
    "I8",
    "I9",
    "I10",
    "J1",
    "J2",
    "J3",
    "J4",
    "J5",
    "J6",
    "J7",
    "J8",
    "J9",
    "J10",
    "K1",
    "K2",
    "K3",
    "K4",
    "K5",
    "K6",
    "K7",
    "K8",
    "K9",
    "K10",
  ]);
  const { movie, totalData, screen } = useSelector((state) => state.cinema);
  const dispatch = useDispatch();

  const handleNavigate = () => {
    if (seatsSelected && seatsSelected.length > 0) {
      navigation.navigate("Popcorn");
      dispatch(UpdateTotalData(totalD));
      dispatch(SeatsSelected(seatsSelected));
    }
  };
  useEffect(() => {
    checkStatusSeats();
    caculator([]);
  }, []);

  const checkStatusSeats = async () => {
    let params = { movieId: movie.id, screenId: screen.screenId };
    let res = await getOccupiedSeats(params);
    if (res.result) {
      setSeatsOccupied(res.listSeatsOccupied);
    }
  };
  const handleSelecSeat = (item) => {
    if (!seatsOccupied.includes(item)) {
      const seatSl = seatsSelected.find((seat) => seat === item);
      let listSeat = [];
      if (seatSl) {
        listSeat = seatsSelected.filter((seat) => seat !== item);
      } else {
        listSeat = [...seatsSelected, item];
      }
      caculator(listSeat);
      // seatSelected(listSeat);
    }
  };
  const caculator = (seats) => {
    let totalTmp = {
      ...totalData,
    };
    if (seats && seats.length > 0) {
      totalTmp.detail =
        seats.length + (seats.length === 1 ? " seat" : " seats");
    } else {
      totalTmp.detail = "";
    }
    if (seats) {
      totalTmp.total = totalMovieMoney(seats);
    }
    setTotalD(totalTmp);
    setseatsSelected(seats);
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
        <SeatsComponent
          seatTable={seatTable}
          seatsSelected={seatsSelected}
          seatsOccupied={seatsOccupied}
          handleSelect={handleSelecSeat}
        />
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
