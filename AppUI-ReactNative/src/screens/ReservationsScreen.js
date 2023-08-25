import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderScreen from "../components/HeaderScreen";
import DateItem from "../components/DateItem";

var { width, height } = Dimensions.get("window");
const ReservationsScreen = () => {
  const { params: item } = useRoute();
  const [dateSelected, setDateSelected] = useState("2023-08-20");
  const [dateTicket, setDateTicket] = useState([
    {
      fullDate: "2023-08-20",
      date: "20",
      day: "sun",
    },
    {
      fullDate: "2023-08-21",
      date: "21",
      day: "sun",
    },
    {
      fullDate: "2023-08-22",
      date: "22",
      day: "sun",
    },
    {
      fullDate: "2023-08-23",
      date: "23",
      day: "sun",
    },
    {
      fullDate: "2023-08-24",
      date: "24",
      day: "sun",
    },
    {
      fullDate: "2023-08-25",
      date: "25",
      day: "sun",
    },
    {
      fullDate: "2023-08-25",
      date: "26",
      day: "sun",
    },
    {
      fullDate: "2023-08-25",
      date: "27",
      day: "sun",
    },
    {
      fullDate: "2023-08-25",
      date: "28",
      day: "sun",
    },
    {
      fullDate: "2023-08-25",
      date: "29",
      day: "sun",
    },
    {
      fullDate: "2023-08-25",
      date: "30",
      day: "sun",
    },
    {
      fullDate: "2023-08-25",
      date: "31",
      day: "sun",
    },
    {
      fullDate: "2023-08-25",
      date: "01",
      day: "sun",
    },
    {
      fullDate: "2023-08-25",
      date: "02",
      day: "sun",
    },
    {
      fullDate: "2023-08-25",
      date: "03",
      day: "sun",
    },
  ]);

  const selectDate = (item) => {
    setDateSelected(item.fullDate);
  };

  return (
    <SafeAreaView className="bg-white flex-1 mt-6">
      {/* Header screen */}
      <HeaderScreen title={item} />
      <View className="mt-1">
        <FlatList
          data={dateTicket}
          horizontal
          renderItem={({ item }) => (
            <DateItem
              data={item}
              dateSelected={dateSelected}
              selectDate={selectDate}
            />
          )}
          keyExtractor={(item) => "date" + item.date}
        />
      </View>
      <View className="m-2 ">
        <Image
          source={require("../assets/images/lottecinema.jpg")}
          style={{ width: width - 10, height: 100 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReservationsScreen;
