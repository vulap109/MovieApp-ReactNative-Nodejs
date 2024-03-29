import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View className="mb-4">
      <Text className="text-white text-xl mx-4 mb-2">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard handleClick={handleClick} item={item} />
        )}
        firstItem={1}
        // loop={true}
        // inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        // source={require('../assets/images/moviePoster1.png')}
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width * 0.6,
          height: height * 0.5,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;
