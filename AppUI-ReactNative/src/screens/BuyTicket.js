import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import HeaderScreen from "../components/HeaderScreen";
import { getCities, getCinemaByCity } from "../services/CinemaService";

const { width, height } = Dimensions.get("window");

const BuyTicket = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [isSelected, setIsSelected] = useState(true);
  const [isContinue, setIsContinue] = useState(false);
  const [cinemaSelected, setCinemaSelected] = useState("");
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
        setCinemaSelected(el.cinemaName);
      } else {
        el.status = false;
      }
    });
    setListTabContent(listTMP);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* Header screen */}
      <HeaderScreen title="Buy Tickets" />

      {/* content screen */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <View className="flex-row flex-1">
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
                        <Text className="px-3 font-normal">
                          {item.cityName}
                        </Text>
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
            <View className="py-2 justify-center items-center">
              <TouchableOpacity
                className="bg-red-600 rounded-full w-1/2 py-2"
                onPress={() =>
                  navigation.navigate("Reservations", cinemaSelected)
                }
              >
                <Text className="text-center text-white font-medium">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default BuyTicket;
