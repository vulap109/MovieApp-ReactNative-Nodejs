import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderScreen from "../components/HeaderScreen";
import DateItem from "../components/DateItem";
import MovieAndSeat from "../components/MovieAndSeat";
import { getCinemaCalendar } from "../services/CinemaService";

var { width, height } = Dimensions.get("window");
const ReservationsScreen = () => {
  const { params: item } = useRoute();
  const [dateSelected, setDateSelected] = useState("2023-08-20");
  const [dateTicket, setDateTicket] = useState([]);
  const [movieSlot, setMovieSlot] = useState([
    {
      id: 1,
      movieTitle: "1",
      rate: "18",
      screen: [
        {
          id: 1,
          type: "2D | phụ đề",
          screenTitle: "Screen 02",
          time: "12:00~13:40",
          chair: "90",
        },
      ],
    },
    {
      id: 2,
      movieTitle: "2",
      rate: "18",
      screen: [
        {
          id: 1,
          type: "2D | phụ đề",
          screenTitle: "Screen 02",
          time: "12:00~13:40",
          chair: "90",
        },
        {
          id: 2,
          type: "2D | phụ đề",
          screenTitle: "Screen 02",
          time: "12:00~13:40",
          chair: "90",
        },
      ],
    },
    {
      id: 3,
      movieTitle: "3",
      rate: "18",
      screen: [
        {
          id: 1,
          type: "2D | phụ đề",
          screenTitle: "Screen 03",
          time: "12:00~13:40",
          chair: "90",
        },
        {
          id: 2,
          type: "2D | phụ đề",
          screenTitle: "Screen 03",
          time: "12:00~13:40",
          chair: "90",
        },
        {
          id: 3,
          type: "2D | phụ đề",
          screenTitle: "Screen 03",
          time: "12:00~13:40",
          chair: "90",
        },
        {
          id: 4,
          type: "2D | phụ đề",
          screenTitle: "Screen 03",
          time: "12:00~13:40",
          chair: "90",
        },
      ],
    },
  ]);

  useEffect(() => {
    getCalendarDate();
  }, []);

  const selectDate = (item) => {
    setDateSelected(item.fullDate);
    getCalendarDate();
    getCalendarCinema();
  };

  const getCalendarDate = () => {
    let today = new Date();
    let calendar = [];
    calendar.push({
      fullDate: today.toLocaleDateString(),
      date: ("00" + today.getDate()).slice(-2),
      day: weekday(today),
    });
    setDateSelected(today.toLocaleDateString());
    for (let index = 0; index < 7; index++) {
      today.setDate(today.getDate() + 1);
      calendar.push({
        fullDate: today.toLocaleDateString(),
        date: ("00" + today.getDate()).slice(-2),
        day: weekday(today),
      });
    }
    setDateTicket(calendar);
  };

  const weekday = (d) => {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekday[d.getDay()];
  };

  const getCalendarCinema = async () => {
    let res = await getCinemaCalendar();
    console.log("cehck ", res);
    if (res.result) {
      let movieList = [];
      res.resultList.map((item) => {
        movieList.push({
          movieId: item.ScreenCalendar.MovieId,
          movieTitle: item.ScreenCalendar.Movie.movieName,
          rate: item.ScreenCalendar.Movie.rate,
          screen: {
            type: item.ScreenCalendar.Movie.techSub,
            screenTitle: item.ScreenCalendar.Screen.screenName,
            time: item.ScreenCalendar.date,
            chair: item.ScreenCalendar.Screen.seat,
          },
        });
        // movieList.map((movie) => {
        //   if (movie.movieId && movie.movieId === item.ScreenCalendar.MovieId) {
        //     movie.screen.push({
        //       type: item.ScreenCalendar.Movie.techSub,
        //       screenTitle: item.ScreenCalendar.Screen.screenName,
        //       time: item.ScreenCalendar.date,
        //       chair: item.ScreenCalendar.Screen.seat,
        //     });
        //   } else {
        //     movieList.push({
        //       movieId: item.ScreenCalendar.MovieId,
        //       movieTitle: item.ScreenCalendar.Movie.movieName,
        //       rate: item.ScreenCalendar.Movie.rate,
        //       screen: {
        //         type: item.ScreenCalendar.Movie.techSub,
        //         screenTitle: item.ScreenCalendar.Screen.screenName,
        //         time: item.ScreenCalendar.date,
        //         chair: item.ScreenCalendar.Screen.seat,
        //       },
        //     });
        //   }
        // });
      });
      console.log(">>> check movielist affter modified", movieList);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 mt-6">
      {/* Header screen */}
      <HeaderScreen title={item} />
      <View className="m-1">
        <FlatList
          data={dateTicket}
          horizontal
          renderItem={({ item }) => (
            <DateItem
              data={item}
              dateSelected={dateSelected}
              selectDate={selectDate}
            />
          )}
          keyExtractor={(item) => "date" + item.date}
        />
      </View>
      <ScrollView>
        <View className="m-2 ">
          <Image
            source={require("../assets/images/lottecinema.jpg")}
            style={{ width: width - 16, height: 100 }}
            className="rounded-lg"
          />
        </View>
        <View className="flex-1">
          {movieSlot &&
            movieSlot.map((item, i) => (
              <MovieAndSeat data={item} key={`item${item.id}`} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReservationsScreen;
