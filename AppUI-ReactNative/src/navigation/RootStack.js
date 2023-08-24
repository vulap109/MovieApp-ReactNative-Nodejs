import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Movie"
        component={MovieScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Person"
        component={PersonScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export { HomeStackScreen };
