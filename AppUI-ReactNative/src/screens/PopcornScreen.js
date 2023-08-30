import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import HeaderScreen from "../components/HeaderScreen";
import PopcornItem from "../components/PopcornItem";
import TotalComponent from "../components/TotalComponent";

const PopcornScreen = () => {
  const [popcornList, setPopcornList] = useState([
    {
      id: 1,
      comboTitle: "Popcorn & drink 1",
      detail: "1234567899",
      amount: 0,
    },
    {
      id: 2,
      comboTitle: "Popcorn & drink 2",
      detail: "1234567899",
      amount: 0,
    },
    {
      id: 3,
      comboTitle: "Popcorn & drink 3",
      detail: "1234567899",
      amount: 0,
    },
    {
      id: 4,
      comboTitle: "Popcorn & drink 4",
      detail: "1234567899",
      amount: 0,
    },
    {
      id: 5,
      comboTitle: "Popcorn & drink 5",
      detail: "1234567899",
      amount: 0,
    },
    {
      id: 6,
      comboTitle: "Popcorn & drink 6",
      detail: "1234567899",
      amount: 0,
    },
  ]);
  const [totalData, setTotalData] = useState({
    name: "Name",
    sub: "2D Vietnam sub",
    total: 0,
    detail: "",
  });

  const handleNavigate = () => {};

  return (
    <SafeAreaView className="bg-slate-200 flex-1 mt-6">
      {/* Header screen */}
      <HeaderScreen title="Popcorn & Drink" />

      <View className="flex-1">
        {/* <PopcornItem /> */}
        <FlatList
          data={popcornList}
          renderItem={({ item }) => <PopcornItem data={item} />}
          keyExtractor={(item) => "popcorn" + item.id}
        />
      </View>
      <TotalComponent
        data={totalData}
        btnTitle={"Payment"}
        handleBtnTotal={handleNavigate}
      />
    </SafeAreaView>
  );
};

export default PopcornScreen;
