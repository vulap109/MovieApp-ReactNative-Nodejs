import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");
const SeatsComponent = ({
  seatTable,
  seatsSelected,
  seatsOccupied,
  handleSelect,
}) => {
  const classifySeat = (seat) => {
    const seatVIP = ["D", "E", "F", "G", "H", "I", "J"];
    let row = seat.slice(0, 1);
    if (seatVIP.includes(row)) {
      return (
        <Text className="pt-1 text-center text-white" style={styles.seatVip}>
          {seat}
        </Text>
      );
    } else if (row === "K") {
      return (
        <Text className="pt-1 text-center text-white" style={styles.seatSB}>
          {seat}
        </Text>
      );
    }
    return (
      <Text className="pt-1 text-center text-white" style={styles.seatNormal}>
        {seat}
      </Text>
    );
  };

  return (
    <View className="flex-1">
      <ScrollView horizontal>
        <View style={{ minWidth: width }}>
          <Text className="text-center mb-5 text-orange-300 text-2xl">
            Screen
          </Text>
          <View className="flex-coloumn items-center">
            <FlatList
              numColumns={10}
              data={seatTable}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback
                  onPress={() => handleSelect(item)}
                  key={`col${index}`}
                >
                  {seatsSelected.includes(item) ? (
                    <View style={styles.seatSelected}>
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={26}
                        color="white"
                      />
                    </View>
                  ) : seatsOccupied.includes(item) ? (
                    <View style={styles.seatNormal}>
                      <Ionicons
                        name="close-circle-outline"
                        size={26}
                        color="white"
                      />
                    </View>
                  ) : (
                    classifySeat(item)
                  )}
                </TouchableWithoutFeedback>
              )}
            />
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
                    <Ionicons
                      name="close-circle-outline"
                      size={28}
                      color="white"
                    />
                  </View>

                  <Text className="text-white px-3">Occupied</Text>
                </View>
                <View className="flex-row items-center">
                  <View style={styles.seatSelected}>
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
    width: 34,
    height: 34,
    backgroundColor: "#9A3B3B",
    borderWidth: 1,
    borderColor: "rgb(38 38 38)",
  },
  seatSB: {
    width: 34,
    height: 34,
    backgroundColor: "#F31559",
    borderWidth: 1,
    borderColor: "rgb(38 38 38)",
  },
  seatNormal: {
    width: 34,
    height: 34,
    backgroundColor: "#9BABB8",
    borderWidth: 1,
    borderColor: "rgb(38 38 38)",
    alignItems: "center",
  },
  seatSelected: {
    width: 34,
    height: 34,
    backgroundColor: "#CD1818",
    borderWidth: 1,
    borderColor: "rgb(38 38 38)",
    alignItems: "center",
  },
});

export default SeatsComponent;
