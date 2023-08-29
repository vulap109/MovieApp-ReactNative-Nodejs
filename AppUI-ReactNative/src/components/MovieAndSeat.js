import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const MovieAndSeat = ({ data }) => {
  const [listScreen, setListScreen] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const screenElement = () => {
      let listTmp = [];
      if (data && data.screen) {
        for (let i = 1; i <= Math.ceil(data.screen.length / 3); i++) {
          listTmp.push(data.screen.slice(i * 3 - 3, i * 3));
        }
        console.log(">> check list tmp end: ", listTmp);
        setListScreen(listTmp);
      }
    };

    screenElement();
  }, []);

  return (
    <View>
      <View className="bg-slate-200 p-3 flex-row items-center">
        {data && data.rate == "18" ? (
          <Text className="bg-red-600 mx-1 rounded-full px-1 py-2">
            T{data.rate}
          </Text>
        ) : (
          <Text className="bg-lime-600 mx-1 rounded-full px-1 py-2">
            T{data.rate}
          </Text>
        )}
        <Text className="text-base ">{data.movieTitle}</Text>
      </View>
      {listScreen.map((row, index) => (
        <View className="px-4 py-2 flex-row" key={`row${index}`}>
          {row.map((item) => {
            return (
              <TouchableWithoutFeedback
                key={`screen${item.id}`}
                onPress={() => navigation.navigate("SeatReservation")}
              >
                <View className="flex-coloumn pr-3">
                  <Text>{item.type}</Text>
                  <ImageBackground
                    source={require("../assets/images/seatcinema.png")}
                    resizeMode="cover"
                    style={{ width: 100, height: 100 }}
                  >
                    <View
                      style={{ backgroundColor: "#000000c0" }}
                      className="flex-1"
                    >
                      <Text className="text-white text-center text-base font-semibold">
                        {item.screenTitle}
                      </Text>
                      <Text className="text-white text-center mt-9">
                        {item.time}
                      </Text>
                      <Text className="text-white text-center">
                        {item.chair} chair
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default MovieAndSeat;
