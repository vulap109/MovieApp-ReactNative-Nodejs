import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";

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
  const [rowNumber, setRowNumber] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [seatAmount, setSeatAmount] = useState(16);

  const seatMatrix = (_row) => {};

  return (
    <View className="bg-slate-400">
      <ScrollView horizontal>
        <Text>Screen</Text>
        <View style={{ width: 1000 }}>
          <View className="flex-row mx-6">
            {rowNumber.map((item, i) => (
              <Text className="px-3 py-1" key={`item${i}`}>
                {item}
              </Text>
            ))}
          </View>
          <View className="flex-coloumn">
            {rowText.map((row, i) => (
              <View className="flex-row" key={`row${i}`}>
                {rowNumber.map((col, index) => (
                  <Text
                    className={
                      i > 9
                        ? "p-2 border border-slate-400 text-center justify-center bg-fuchsia-600"
                        : "p-2 border border-slate-400 text-center justify-center bg-red-800"
                    }
                    key={`col${index}`}
                    style={{ width: 45, height: 45 }}
                  >
                    {row}
                    {col}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SeatsComponent;
