import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image } from "react-native";

import CustomDrawer from "../components/CustomDrawer";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
import ListMovies from "../screens/ListMovies";
import BuyTicket from "../screens/BuyTicket";
import ReservationsScreen from "../screens/ReservationsScreen";
import SeatReservationScreen from "../screens/SeatReservationScreen";
import PopcornScreen from "../screens/PopcornScreen";
import PaymentScreen from "../screens/PaymentScreen";
import UpdateSoon from "../screens/UpdateSoon";
import MapScreen from "../screens/MapScreen";

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Movie" component={MovieScreen} />
      <HomeStack.Screen name="Person" component={PersonScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="Tickets" component={BuyTicket} />
      <HomeStack.Screen name="Reservations" component={ReservationsScreen} />
      <HomeStack.Screen
        name="SeatReservation"
        component={SeatReservationScreen}
      />
      <HomeStack.Screen name="Popcorn" component={PopcornScreen} />
      <HomeStack.Screen name="Payment" component={PaymentScreen} />
      <HomeStack.Screen name="Movies" component={ListMovies} />
    </HomeStack.Navigator>
  );
};

const MoviesStack = createNativeStackNavigator();
const MoviesStackScreen = () => {
  return (
    <MoviesStack.Navigator initialRouteName="Movies">
      <MoviesStack.Screen
        name="Movies"
        component={ListMovies}
        options={{ headerShown: false }}
      />
      <MoviesStack.Screen
        name="Movie"
        component={MovieScreen}
        options={{ headerShown: false }}
      />
      <MoviesStack.Screen
        name="Person"
        component={PersonScreen}
        options={{ headerShown: false }}
      />
    </MoviesStack.Navigator>
  );
};

const TicketsStack = createNativeStackNavigator();
const TicketsStackScreen = () => {
  return (
    <TicketsStack.Navigator
      initialRouteName="Tickets"
      screenOptions={{
        headerShown: false,
      }}
    >
      <TicketsStack.Screen name="Tickets" component={BuyTicket} />
      <TicketsStack.Screen name="Reservations" component={ReservationsScreen} />
      <TicketsStack.Screen
        name="SeatReservation"
        component={SeatReservationScreen}
      />
      <TicketsStack.Screen name="Popcorn" component={PopcornScreen} />
      <TicketsStack.Screen name="Payment" component={PaymentScreen} />
    </TicketsStack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#ED2B2A",
        drawerActiveTintColor: "#FFF",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          fontSize: 15,
          marginLeft: -20,
        },
        drawerPosition: "right",
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeStackScreen}
        options={{
          title: "Home",
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={30} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="TicketStack"
        component={TicketsStackScreen}
        options={{
          title: "Ticket",
          drawerIcon: () => (
            <Image
              source={require("../assets/images/drawer/tickets.png")}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="MoviesStack"
        component={MoviesStackScreen}
        options={{
          title: "Movie",
          drawerIcon: () => (
            <Image
              source={require("../assets/images/drawer/movies.png")}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Cinema"
        component={TicketsStackScreen}
        options={{
          drawerIcon: () => (
            <Image
              source={require("../assets/images/drawer/cinema.png")}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Promotion"
        component={UpdateSoon}
        options={{
          drawerIcon: () => (
            <Image
              source={require("../assets/images/drawer/coupons.png")}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Gift"
        component={UpdateSoon}
        options={{
          title: "Gift shop",
          drawerIcon: () => (
            <Image
              source={require("../assets/images/drawer/gift-voucher.png")}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Map",
          drawerIcon: () => (
            <Image
              source={require("../assets/images/drawer/gift-voucher.png")}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export { HomeStackScreen, DrawerNavigation };
