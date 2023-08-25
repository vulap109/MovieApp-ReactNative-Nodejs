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
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from "../components/loading";
import HeaderScreen from "../components/HeaderScreen";
import { fetchTrendingMovies } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const BuyTicket = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [isSelected, setIsSelected] = useState(true);
  const [isContinue, setIsContinue] = useState(false);
  const [cinemaSelected, setCinemaSelected] = useState("");
  const [listTabs, setListTabs] = useState([
    {
      name: "Home",
      status: true,
    },
    {
      name: "About",
      status: false,
    },
    {
      name: "Contact",
      status: false,
    },
    {
      name: "Home1",
      status: false,
    },
    {
      name: "About1",
      status: false,
    },
    {
      name: "Contact1",
      status: false,
    },
  ]);
  const [listTabContent, setListTabContent] = useState([
    {
      name: "Home content",
      status: false,
    },
    {
      name: "About  content",
      status: false,
    },
    {
      name: "Contact  content",
      status: false,
    },
    {
      name: "Home1  content",
      status: false,
    },
    {
      name: "About1  content",
      status: false,
    },
    {
      name: "Contact1  content",
      status: false,
    },
  ]);

  useEffect(() => {
    handleSelectCinema({ name: "" });
  }, []);

  const handleSelectTab = (item) => {
    let listTMP = [...listTabs];
    listTMP.map((el) => {
      if (el.name == item.name) {
        el.status = true;
      } else {
        el.status = false;
      }
    });
    setListTabs(listTMP);
  };

  const handleSelectCinema = (item) => {
    setIsContinue(false);

    let listTMP = [...listTabContent];
    listTMP.map((el) => {
      if (el.name == item.name) {
        el.status = true;
        setIsContinue(true);
        setCinemaSelected(el.name);
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
            <View className="flex-auto h-full ">
              <ScrollView showsVerticalScrollIndicator={false}>
                {listTabs.map((item, index) => {
                  return (
                    <TouchableOpacity
                      className={item.status ? "bg-orange-100 py-3" : "py-3"}
                      onPress={() => handleSelectTab(item)}
                      key={`tab${index}`}
                    >
                      <Text className="px-3 font-normal">{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View className="flex-auto bg-orange-100 h-full">
              <ScrollView showsVerticalScrollIndicator={false}>
                {listTabContent.map((item, index) => {
                  return (
                    <TouchableOpacity
                      className={item.status ? "bg-neutral-700 py-3" : "py-3"}
                      onPress={() => handleSelectCinema(item)}
                      key={`content${index}`}
                    >
                      <Text
                        className={
                          item.status
                            ? "text-white px-3 font-normal"
                            : "text-black px-3 font-normal"
                        }
                      >
                        {item.name}
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
