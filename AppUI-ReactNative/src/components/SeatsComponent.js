import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SeatsSelected } from "../redux/action/cinemaAction";
import { getOccupiedSeats } from "../services/CinemaService";

const SeatsComponent = ({ seatSelected }) => {
  const dispatch = useDispatch();
  const { screen, movie } = useSelector((state) => state.cinema);
  const [rowText, setRowText] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
  ]);
  const [rowNumber, setRowNumber] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [matrixSeats, setMatrixSeats] = useState([]);
  const [seatsOccupied, setSeatsOccupied] = useState(null);

  useEffect(() => {
    checkStatusSeats();
  }, []);
  useEffect(() => {
    drawSeat();
  }, [seatsOccupied]);

  const drawSeat = () => {
    let matrixSeats = [];
    rowText.map((row) => {
      let matrixRow = [];
      rowNumber.map((col) => {
        let seatItem = { seat: row + col, status: 0 };
        if (screen && screen.seatSelected) {
          screen.seatSelected.map((item) => {
            if (item.seat == row + col) {
              seatItem = { seat: row + col, status: 1 };
            }
          });
        }
        if (seatsOccupied && seatsOccupied.includes((row + col).toString())) {
          seatItem = { seat: row + col, status: 2 };
        }
        matrixRow.push(seatItem);
      });
      matrixSeats.push(matrixRow);
    });
    setMatrixSeats(matrixSeats);
  };

  const checkStatusSeats = async () => {
    let params = { movieId: movie.id, screenId: screen.screenId };
    let res = await getOccupiedSeats(params);
    if (res.result) {
      setSeatsOccupied(res.listSeatsOccupied);
    }
  };

  const handleSelecSeat = (indexRow, indexCol) => {
    let listSeat = [...matrixSeats];
    let seatSel = [];
    if (listSeat[indexRow][indexCol].status !== 2) {
      listSeat[indexRow][indexCol].status =
        listSeat[indexRow][indexCol].status === 0 ? 1 : 0;
    }
    setMatrixSeats(listSeat);

    seatSelected(listSeat);
    // listSeat.map((row) => {
    //   row.map((col) => {
    //     if (col.status === 1) {
    //       // list seats selected
    //       seatSel.push(col);
    //     }
    //   });
    // });
    // dispatch(SeatsSelected(seatSel));
    console.log(">>> check listSeat: ", listSeat[indexRow][indexCol]);
  };

  return (
    <View className="flex-1">
      <ScrollView horizontal>
        <View style={{ width: 700 }}>
          <Text className="text-center mb-5 text-orange-300 text-2xl">
            Screen
          </Text>
          <View className="flex-coloumn">
            {matrixSeats.map((row, i) => (
              <View className="flex-row justify-center" key={`row${i}`}>
                {row.map((col, index) => (
                  <TouchableWithoutFeedback
                    onPress={() => handleSelecSeat(i, index)}
                    key={`col${index}`}
                  >
                    {col.status === 1 ? (
                      <View style={styles.seatSelected}>
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={26}
                          color="white"
                        />
                      </View>
                    ) : col.status === 2 ? (
                      <View style={styles.seatNormal}>
                        <Ionicons
                          name="close-circle-outline"
                          size={26}
                          color="white"
                        />
                      </View>
                    ) : (
                      <Text
                        className="pt-1 text-center text-white"
                        style={
                          i > 9
                            ? styles.seatSB
                            : i < 3
                            ? styles.seatNormal
                            : styles.seatVip
                        }
                      >
                        {col.seat}
                      </Text>
                    )}
                  </TouchableWithoutFeedback>
                ))}
              </View>
            ))}
          </View>
          <View className="mt-5 items-center">
            <View>
              <View className="flex-row">
                <View className="flex-row items-center">
                  <Text style={styles.seatNormal}></Text>
                  <Text className="text-white px-3">Standard </Text>
                </View>
                <View className="flex-row items-center">
                  <Text style={styles.seatVip}></Text>
                  <Text className="text-white px-3">VIP</Text>
                </View>
                <View className="flex-row items-center">
                  <Text style={styles.seatSB}></Text>
                  <Text className="text-white px-3">Sweet Box</Text>
                </View>
              </View>
              <View className="mt-2 flex-row">
                <View className="flex-row items-center">
                  <View style={styles.seatNormal}>
                    {/* <Text
                      className="text-5xl text-white text-center"
                      style={{ lineHeight: 40 }}
                    >
                      ×
                    </Text> */}
                    <Ionicons
                      name="close-circle-outline"
                      size={26}
                      color="white"
                    />
                  </View>

                  <Text className="text-white px-3">Occupied</Text>
                </View>
                <View className="flex-row items-center">
                  <View style={styles.seatSelected}>
                    {/* <Text
                      className="text-5xl text-white"
                      style={{ lineHeight: 42, left: -1 }}
                    >
                      ○
                    </Text> */}
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={26}
                      color="white"
                    />
                  </View>
                  <Text className="text-white px-3">Selected</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  seatVip: {
    width: 30,
    height: 30,
    backgroundColor: "#9A3B3B",
    borderWidth: 1,
    borderColor: "rgb(38 38 38)",
  },
  seatSB: {
    width: 30,
    height: 30,
    backgroundColor: "#F31559",
    borderWidth: 1,
    borderColor: "rgb(38 38 38)",
  },
  seatNormal: {
    width: 30,
    height: 30,
    backgroundColor: "#9BABB8",
    borderWidth: 1,
    borderColor: "rgb(38 38 38)",
    alignItems: "center",
  },
  seatSelected: {
    width: 30,
    height: 30,
    backgroundColor: "#CD1818",
    borderWidth: 1,
    borderColor: "rgb(38 38 38)",
    alignItems: "center",
  },
});

export default SeatsComponent;
