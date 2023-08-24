import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";
import { debounce } from "lodash";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from "../components/loading";

const { width, height } = Dimensions.get("window");

const ListMovies = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [isReleaseSelected, setIsReleaseSelected] = useState(true);

  useEffect(() => {
    const handleSearch = () => {
      setLoading(true);
      searchMovies({
        query: "the",
        include_adult: false,
        language: "en-US",
        page: "1",
      }).then((data) => {
        console.log("got search results");
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    };

    handleSearch();
  }, []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/* search input */}
      <View className="mb-3 flex-row items-center rounded-b-lg bg-red-600 p-1">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color={"#FFF"} />
        </TouchableOpacity>
        <Text className="text-white font-semibold flex-1 text-center text-lg mr-6">
          Movies
        </Text>
      </View>

      {/* search results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <View className="flex-row py-1">
            <TouchableOpacity
              className="ml-1"
              onPress={() => setIsReleaseSelected(true)}
            >
              <Text
                className={
                  isReleaseSelected
                    ? "text-white font-semibold"
                    : "text-white font-thin"
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
                    ? "text-white font-thin"
                    : "text-white font-semibold"
                }
              >
                Upcoming movie
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri: image185(item.poster_path) || fallbackMoviePoster,
                      }}
                      // source={require('../assets/images/moviePoster2.png')}
                      className="rounded-3xl"
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-gray-300 ml-1">
                      {item.title.length > 22
                        ? item.title.slice(0, 22) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ListMovies;
