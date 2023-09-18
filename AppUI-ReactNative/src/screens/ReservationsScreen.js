import { View, FlatList, Image, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import HeaderScreen from "../components/HeaderScreen";
import DateItem from "../components/DateItem";
import MovieAndSeat from "../components/MovieAndSeat";
import { getCinemaCalendar, getMovieCalendar } from "../services/CinemaService";
import { formatDate } from "../utils/format";
import { selectedDate } from "../redux/action/cinemaAction";

var { width, height } = Dimensions.get("window");
const ReservationsScreen = () => {
  const { params: item } = useRoute();
  const dispatch = useDispatch();
  const [dateSelected, setDateSelected] = useState("");
  const [dateTicket, setDateTicket] = useState([]);
  const [movieSlot, setMovieSlot] = useState([]);

  useEffect(() => {
    getCalendarDate();
  }, []);

  const selectDate = (fullDate) => {
    setDateSelected(fullDate);
    // getCalendarDate();
    getCalendarCinema(fullDate);
    console.log("check selected date ", fullDate);
    dispatch(selectedDate(fullDate));
  };

  const getCalendarDate = () => {
    let today = new Date();
    let calendar = [];
    calendar.push({
      fullDate: formatDate(today),
      date: ("00" + today.getDate()).slice(-2),
      day: weekday(today),
    });
    selectDate(formatDate(today));

    for (let index = 0; index < 6; index++) {
      today.setDate(today.getDate() + 1);
      calendar.push({
        fullDate: formatDate(today),
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

  const getCalendarCinema = async (date) => {
    let res = null;
    console.log("check item route: ", item);
    if (item && item.movieName) {
      res = await getMovieCalendar(
        item.cinemaSelected.id,
        date,
        item.movieName
      );
      console.log("check movie booked", res);
    } else {
      res = await getCinemaCalendar(item.cinemaSelected.id, date);
    }
    if (res && res.result) {
      let movieList = [];
      res.resultList.map((item) => {
        let index = movieList.findIndex(
          (m) => m.movieId === item.ScreenCalendar.MovieId
        );
        if (index !== -1) {
          movieList[index].screen.push({
            screenId: item.ScreenCalendar.ScreenId,
            type: item.ScreenCalendar.Movie.techSub,
            screenTitle: item.ScreenCalendar.Screen.screenName,
            time: item.ScreenCalendar.date,
            chair: item.ScreenCalendar.Screen.seat,
          });
        } else {
          movieList.push({
            movieId: item.ScreenCalendar.MovieId,
            movieTitle: item.ScreenCalendar.Movie.movieName,
            rate: item.ScreenCalendar.Movie.rate,
            screen: [
              {
                screenId: item.ScreenCalendar.ScreenId,
                type: item.ScreenCalendar.Movie.techSub,
                screenTitle: item.ScreenCalendar.Screen.screenName,
                time: item.ScreenCalendar.date,
                chair: item.ScreenCalendar.Screen.seat,
              },
            ],
          });
        }
      });
      setMovieSlot(movieList);
    }
  };

  return (
    <SafeAreaView className="bg-red-600 flex-1">
      {/* Header screen */}
      <View className="bg-white flex-1">
        <HeaderScreen title={item.cinemaSelected.title} />

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
                <MovieAndSeat data={item} key={`item${i}`} />
              ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ReservationsScreen;
