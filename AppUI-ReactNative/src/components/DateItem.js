import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

const DateItem = ({ data, selectDate, dateSelected }) => {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (data.fullDate == dateSelected) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [dateSelected]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => selectDate(data.fullDate)}
    >
      <View
        className={
          isSelected
            ? "bg-slate-900 px-3 py-1 justify-center items-center rounded-2xl"
            : " px-3 py-1 justify-center items-center rounded-xl"
        }
      >
        <Text
          className={
            isSelected
              ? "font-bold text-2xl text-white"
              : "font-bold text-2xl text-black"
          }
        >
          {data.date}
        </Text>
        <Text className={isSelected ? "text-white" : "text-black"}>
          {data.day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DateItem;
