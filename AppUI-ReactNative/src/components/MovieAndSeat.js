import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { SeatsReservation } from "../redux/action/cinemaAction";

const MovieAndSeat = ({ data }) => {
  const [listScreen, setListScreen] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userState } = useSelector((state) => state.user);

  useEffect(() => {
    const screenElement = () => {
      let listTmp = [];
      if (data && data.screen) {
        for (let i = 1; i <= Math.ceil(data.screen.length / 3); i++) {
          listTmp.push(data.screen.slice(i * 3 - 3, i * 3));
        }
        setListScreen(listTmp);
      }
    };

    screenElement();
  }, [data]);

  const redirectToSeats = (item) => {
    console.log("check screen ", item);
    console.log("data screen ", data);
    console.log("check state ", userState);
    if (userState.auth) {
      let movie = {
        id: data.movieId,
        title: data.movieTitle,
        rate: data.rate,
      };
      dispatch(SeatsReservation(navigation, item, movie));
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View>
      <View className="bg-slate-200 p-3 flex-row items-center">
        {data && data.rate === "18" ? (
          <Image
            source={require("../assets/icons/number-18.png")}
            style={styles.iconRate}
          />
        ) : (
          <Image
            source={require("../assets/icons/number-16.png")}
            style={styles.iconRate}
          />
        )}
        <Text className="text-base pl-2">{data.movieTitle}</Text>
      </View>
      {listScreen &&
        listScreen.map((row, index) => (
          <View className="px-4 py-2 flex-row" key={`row${index}`}>
            {row &&
              row.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={`screen${index}`}
                    onPress={() => redirectToSeats(item)}
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

const styles = StyleSheet.create({
  iconRate: {
    width: 20,
    height: 20,
  },
});

export default MovieAndSeat;
