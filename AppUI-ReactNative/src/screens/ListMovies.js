import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  fallbackMoviePoster,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  image185,
} from "../api/moviedb";
import Loading from "../components/loading";
import HeaderScreen from "../components/HeaderScreen";
import { fetchTrendingMovies } from "../api/moviedb";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");

const ListMovies = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [isReleaseSelected, setIsReleaseSelected] = useState(true);
  const { params: item } = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const getListMovies = async () => {
      let data = null;
      if (item === "Upcoming") {
        data = await fetchUpcomingMovies();
      } else if (item === "Top Rated") {
        data = await fetchTopRatedMovies();
      } else {
        if (isReleaseSelected) {
          data = await fetchTrendingMovies();
        } else {
          data = await fetchUpcomingMovies();
        }
      }
      if (data && data.results) {
        setResults(data.results);
      } else {
        //An error occurred within the server.
        Alert.alert("An error occurred within the server.");
      }
      setLoading(false);
    };

    getListMovies();
  }, [isReleaseSelected]);

  const handleBuyTicket = (title) => {
    navigation.navigate("Tickets", title);
  };

  return (
    <SafeAreaView className="bg-red-600">
      {/* Header screen */}
      <View className="bg-white">
        <HeaderScreen title="Movies" />
        {/* search results */}
        {loading ? (
          <Loading />
        ) : results.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className="space-y-3 bg-white"
          >
            {!item && (
              <View className="flex-row py-1">
                <TouchableOpacity
                  className="ml-1"
                  onPress={() => setIsReleaseSelected(true)}
                >
                  <Text
                    className={
                      isReleaseSelected
                        ? "text-slate-600 font-semibold"
                        : "text-slate-600 font-light"
                    }
                  >
                    The released movie
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="pl-3"
                  onPress={() => setIsReleaseSelected(false)}
                >
                  <Text
                    className={
                      isReleaseSelected
                        ? "text-slate-600 font-light"
                        : "text-slate-600 font-semibold"
                    }
                  >
                    Upcoming movie
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View className="flex-row justify-between flex-wrap mt-4">
              {results.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.push("Movie", item)}
                  >
                    <View className="space-y-2 mb-4 flex-row">
                      <Image
                        source={{
                          uri:
                            image185(item.poster_path) || fallbackMoviePoster,
                        }}
                        // source={require('../assets/images/moviePoster2.png')}
                        className="rounded-xl"
                        style={{ width: width * 0.33, height: height * 0.25 }}
                      />
                      <View className="mx-1">
                        <Text className="text-black font-semibold text-lg">
                          {item.title.length > 23
                            ? item.title.slice(0, 23) + "..."
                            : item.title}
                        </Text>
                        <Text className="text-slate-600">
                          Stating : {item.release_date} 📅
                        </Text>
                        <Text className="text-slate-600">
                          Ratings : {item.vote_average} ⭐
                        </Text>
                        <Text className="text-slate-600">
                          Vote count : {item.vote_count} 💬
                        </Text>
                        {isReleaseSelected && (
                          <TouchableOpacity
                            className="bg-red-600 justify-center rounded-full mt-2 w-32 pb-1"
                            onPress={() => handleBuyTicket(item.title)}
                          >
                            <Text className="text-white text-center py-2 font-medium">
                              Buy tickets
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <View className="flex-row justify-center bg-white">
            <Image
              source={require("../assets/images/movieTime.png")}
              className="h-96 w-96"
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ListMovies;
