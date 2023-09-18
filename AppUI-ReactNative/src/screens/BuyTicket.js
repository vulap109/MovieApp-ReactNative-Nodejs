import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import HeaderScreen from "../components/HeaderScreen";
import { getCities, getCinemaByCity } from "../services/CinemaService";
import { selectedCinema } from "../redux/action/cinemaAction";

const BuyTicket = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params: movieName } = useRoute();
  const [isContinue, setIsContinue] = useState(false);
  const [cinemaSelected, setCinemaSelected] = useState({});
  const [listTabs, setListTabs] = useState([]);
  const [listTabContent, setListTabContent] = useState([]);

  useEffect(() => {
    getListCities();
  }, []);

  const getListCities = async () => {
    let res = await getCities();
    if (res.result) {
      let cityList = [...res.resultList];
      cityList.map((item, index) => {
        if (index == 0) {
          item.status = true;
        } else {
          item.status = false;
        }
      });
      setListTabs(cityList);
      handleGetCinemaByCity(cityList[0].id);
    } else {
      //An error occurred within the server.
      Alert.alert("An error occurred within the server.");
    }
  };

  const handleSelectTab = (item) => {
    let listTMP = [...listTabs];
    listTMP.map((el) => {
      if (el.cityName == item.cityName) {
        el.status = true;
      } else {
        el.status = false;
      }
    });
    setListTabs(listTMP);
    handleGetCinemaByCity(item.id);
  };

  const handleGetCinemaByCity = async (id) => {
    let res = await getCinemaByCity(id);
    if (res.result) {
      let cinemaList = [...res.resultList];
      cinemaList.map((item) => {
        item.status = false;
      });
      setListTabContent(cinemaList);
    }
  };

  const handleSelectCinema = (item) => {
    setIsContinue(false);

    let listTMP = [...listTabContent];
    listTMP.map((el) => {
      if (el.cinemaName === item.cinemaName) {
        el.status = true;
        setIsContinue(true);
        setCinemaSelected({ title: el.cinemaName, id: el.id });
      } else {
        el.status = false;
      }
    });
    setListTabContent(listTMP);
  };

  const handleRedirectCinema = () => {
    console.log("check movie name ", movieName);
    navigation.navigate("Reservations", { cinemaSelected, movieName });
    dispatch(selectedCinema(cinemaSelected));
  };

  return (
    <SafeAreaView className="bg-red-600 flex-1">
      {/* Header screen */}
      <View className="bg-white">
        <HeaderScreen title="Buy Tickets" />
      </View>

      {/* content screen */}
      <>
        <View className="bg-white flex-row flex-1">
          <View className="flex-1 h-full ">
            <ScrollView showsVerticalScrollIndicator={false}>
              {listTabs &&
                listTabs.map((item) => {
                  return (
                    <TouchableOpacity
                      className={item.status ? "bg-orange-100 py-3" : "py-3"}
                      onPress={() => handleSelectTab(item)}
                      key={`city${item.id}`}
                    >
                      <Text className="px-3 font-normal">{item.cityName}</Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
          <View className="flex-1 bg-orange-100 h-full">
            <ScrollView showsVerticalScrollIndicator={false}>
              {listTabContent &&
                listTabContent.map((item, index) => {
                  return (
                    <TouchableOpacity
                      className={item.status ? "bg-neutral-700 py-3" : "py-3"}
                      onPress={() => handleSelectCinema(item)}
                      key={`cinema${index}`}
                    >
                      <Text
                        className={
                          item.status
                            ? "text-white px-3 font-normal"
                            : "text-black px-3 font-normal"
                        }
                      >
                        {item.cinemaName}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        </View>
        {isContinue && (
          <View className="py-2 justify-center items-center bg-white">
            <TouchableOpacity
              className="bg-red-600 rounded-full w-1/2 py-2"
              onPress={() => handleRedirectCinema()}
            >
              <Text className="text-center text-white font-medium">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    </SafeAreaView>
  );
};

export default BuyTicket;
