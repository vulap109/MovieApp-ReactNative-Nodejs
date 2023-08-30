import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

const SeatsComponent = () => {
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
  const [seatAmount, setSeatAmount] = useState(16);

  const seatMatrix = (_row) => {};

  return (
    <View className="flex-1">
      <ScrollView horizontal>
        <View style={{ width: 700 }}>
          <Text className="text-center mb-5 text-orange-300 text-2xl">
            Screen
          </Text>
          <View className="flex-coloumn">
            {rowText.map((row, i) => (
              <View className="flex-row justify-center" key={`row${i}`}>
                {rowNumber.map((col, index) => (
                  <Text
                    className="pt-1 border border-neutral-800 text-center text-white"
                    key={`col${index}`}
                    style={
                      i > 9
                        ? styles.seatSB
                        : i < 3
                        ? styles.seatNormal
                        : styles.seatVip
                    }
                  >
                    {row}
                    {col}
                  </Text>
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
                  <Text
                    style={styles.seatNormal}
                    className="text-3xl text-white text-center"
                  >
                    ×
                  </Text>
                  <Text className="text-white px-3">Occupied</Text>
                </View>
                <View className="flex-row items-center">
                  <Text
                    style={styles.seatSelected}
                    className="text-3xl text-white text-center"
                  >
                    ○
                  </Text>
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
  },
  seatSB: {
    width: 30,
    height: 30,
    backgroundColor: "#F31559",
  },
  seatNormal: {
    width: 30,
    height: 30,
    backgroundColor: "#9BABB8",
  },
  seatSelected: {
    width: 30,
    height: 30,
    backgroundColor: "#CD1818",
  },
});

export default SeatsComponent;
