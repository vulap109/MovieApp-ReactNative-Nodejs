import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { styles } from "../theme";

const ios = Platform.OS === "ios";
var { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const textColor = {
    textTitle: "text-black",
    textDetail: "text-neutral-800",
  };

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log("got trending :", data.results.length);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log("got upcoming: ", data.results.length);
    if (data && data.results) setUpcoming(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log("got top rated: ", data.results.length);
    if (data && data.results) setTopRated(data.results);
  };

  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View>
          <Image
            source={require("../assets/images/moviePoster2.png")}
            // source={{
            //   uri: image500(movie.poster_path) || fallbackMoviePoster,
            // }}
            style={{ width, height: height * 0.68 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
        <View style={{ marginTop: -(height * 0.68) }}>
          {/* search bar */}
          <SafeAreaView>
            <StatusBar style="light" />
            <View className="flex-row justify-between items-center mx-4">
              <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
              </TouchableOpacity>
              <Text className="text-white text-3xl font-bold">
                <Text style={styles.text}>M</Text>ovies
              </Text>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          {loading ? (
            <Loading />
          ) : (
            <View>
              {/* Trending Movies Carousel */}
              {trending.length > 0 && <TrendingMovies data={trending} />}

              <View className="bg-neutral-200">
                {/* upcoming movies row */}
                {upcoming.length > 0 && (
                  <MovieList
                    title="Upcoming"
                    data={upcoming}
                    color={textColor}
                  />
                )}

                {/* top rated movies row */}
                {topRated.length > 0 && (
                  <MovieList
                    title="Top Rated"
                    data={topRated}
                    color={textColor}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default HomeScreen;
