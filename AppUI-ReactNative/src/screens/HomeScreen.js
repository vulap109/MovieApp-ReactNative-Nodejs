import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
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
import * as Progress from "react-native-progress";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../theme";
import messaging from "@react-native-firebase/messaging";

const ios = Platform.OS === "ios";
var { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const textColor = {
    textTitle: "text-white",
    textDetail: "text-neutral-200",
  };

  useEffect(() => {
    setLoading(true);
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    countDown();
    getTokenNoti();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log("got trending :", data.results.length);
    if (data && data.results) setTrending(data.results);
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

  // turn off loading screen
  const countDown = () => {
    setTimeout(() => setLoading(false), 700);
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };
  const getTokenNoti = () => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          console.log("get token noti: ", token);
        });
    } else {
      console.log("get token noti failed: ");
    }

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        "A new message!",
        JSON.stringify(remoteMessage.notification.title),
        JSON.stringify(remoteMessage.notification.body)
      );
    });

    return unsubscribe;
  };

  return (
    <View className="flex-1 bg-neutral-900">
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
        <View style={{ marginTop: -(height * 0.682) }}>
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
            <View
              className="justify-center items-center flex-1"
              style={{ height, width }}
            >
              <Progress.CircleSnail
                thickness={12}
                size={160}
                color="rgb(220 38 38)"
              />
            </View>
          ) : (
            <View>
              {/* Trending Movies Carousel */}
              {trending.length > 0 && <TrendingMovies data={trending} />}

              <View className="bg-neutral-900">
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
