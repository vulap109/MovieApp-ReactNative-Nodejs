import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreen from "../components/HeaderScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber, totalMovieMoney } from "../utils/format";
import { saveReservationTicket } from "../services/CinemaService";
import { useNavigation } from "@react-navigation/native";

const PaymentScreen = () => {
  const [selectedOptionPayment, setSelectedOptionPayment] = useState("ATM");
  const {
    screen,
    movie,
    totalData,
    popComboSelected,
    selectedCinema,
    selectedDate,
    setGoBack,
  } = useSelector((state) => state.cinema);
  const { userState } = useSelector((state) => state.user);
  const [totalSeatsM, setTotalSeatsM] = useState(0);
  const [totalPopcornM, setTotalPopcornM] = useState(0);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    let subTotalPopcorn = 0;
    if (popComboSelected) {
      popComboSelected.map((p) => {
        subTotalPopcorn += p.price;
      });
      setTotalPopcornM(subTotalPopcorn);
    }
    if (screen && screen.seatSelected) {
      setTotalSeatsM(totalMovieMoney(screen.seatSelected));
    }
  }, []);
  console.log("check payment screen: ", screen);
  console.log("check payment movie: ", movie);
  console.log("check payment total data: ", totalData);
  console.log("check payment popcorn: ", popComboSelected);
  console.log("check payment cienam: ", selectedCinema);

  const handlePayment = async () => {
    let data = {
      screenId: screen.screenId,
      movieId: movie.id,
      user: userState.access_token,
      payment: selectedOptionPayment,
      total: totalData.total,
      seatSelected: screen.seatSelected,
      popComboSelected: popComboSelected,
    };
    console.log("data send: ", data, userState);
    // let res = await saveReservationTicket(data);
    // console.log("check API save reservation: ", res);
    return Alert.alert("Reservation", "res.message", [
      // The "Yes" button
      {
        text: "OK",
        // onPress: () => navigation.navigate("Home"),
        onPress: () => goToHome(),
      },
    ]);
  };

  const goToHome = async () => {
    await navigation.popToTop();
    if (!setGoBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-red-600">
      {/* Header screen */}
      <View className="bg-white">
        <HeaderScreen title="Payment" />
      </View>

      <View className="flex-row bg-white">
        <View style={styles.sumaryImg}>
          <Image
            source={require("../assets/images/moviePoster2.png")}
            style={styles.movieImg}
          />
        </View>
        <View style={styles.sumaryTicket2}>
          <View className="flex-row items-center">
            {movie && movie.rate == 18 ? (
              <Image
                source={require("../assets/icons/number-18.png")}
                style={styles.iconRate}
              />
            ) : (
              <Image
                source={require("../assets/icons/number-16.png")}
                style={styles.iconRate}
              />
            )}
            <Text className="text-lg font-semibold ml-2">{movie.title}</Text>
          </View>
          <Text>{selectedDate}</Text>
          <Text>{screen.time}</Text>
          <Text className="font-semibold">{selectedCinema.title}</Text>
          <Text className="font-semibold">{screen.screenTitle}</Text>
          <Text className="font-semibold">
            Seat:{" "}
            {screen &&
              screen.seatSelected &&
              screen.seatSelected.map((s, i) => {
                if (i > 0) {
                  return "," + s.seat;
                }
                return s.seat;
              })}
          </Text>
          {popComboSelected &&
            popComboSelected.length > 0 &&
            popComboSelected.map((pop, index) => (
              <Text key={`pop${index}`}>
                {pop.comboName} x{pop.amount}
              </Text>
            ))}
          <Text className="font-semibold text-lg text-red-700">
            Total payment: {formatNumber(totalData.total)}
          </Text>
        </View>
      </View>
      <ScrollView className="bg-white">
        <View>
          <Text className="p-2 pt-4 bg-neutral-400">TICKET INFORMATION</Text>
          <View className="flex-row justify-between p-2 border-y  border-stone-400">
            <Text>Quantity</Text>
            <Text>
              {screen && screen.seatSelected && screen.seatSelected.length}
            </Text>
          </View>
          <View className="flex-row justify-between p-2 border-b border-stone-400">
            <Text>Subtotal</Text>
            <Text>{formatNumber(totalSeatsM)}</Text>
          </View>
        </View>
        {popComboSelected && popComboSelected.length > 0 && (
          <View>
            <Text className="p-2 pt-4 bg-neutral-400">
              CONCESSION (OPTIONAL)
            </Text>
            {popComboSelected.map((item, index) => (
              <View
                className="flex-row justify-between p-2 border-t  border-stone-400"
                key={`pop${index}`}
              >
                <Text>{item.comboName}</Text>
                <Text>{item.amount}</Text>
              </View>
            ))}
            <View className="flex-row justify-between p-2 border-y border-stone-400">
              <Text>Subtotal</Text>
              <Text>{formatNumber(totalPopcornM)}</Text>
            </View>
          </View>
        )}
        <View>
          <Text className="p-2 pt-4 bg-neutral-400">DISCOUNT PAYMENT</Text>
          <View className="flex-row justify-between p-2 border-t  border-stone-400">
            <Text>Cinema Voucher</Text>
            <Ionicons name="chevron-forward" size={20} />
          </View>
          <View className="flex-row justify-between p-2 border-t  border-stone-400">
            <Text>Cinema Voucher</Text>
            <Ionicons name="chevron-forward" size={20} />
          </View>
          <View className="flex-row justify-between p-2 border-t  border-stone-400">
            <Text>Cinema Voucher</Text>
            <Ionicons name="chevron-forward" size={20} />
          </View>
          <View className="flex-row justify-between p-2 border-t  border-stone-400">
            <Text>Cinema Voucher</Text>
            <Ionicons name="chevron-forward" size={20} />
          </View>
        </View>
        <View>
          <Text className="p-2 pt-4 bg-neutral-400">SUMARY</Text>
          <View className="flex-row justify-between p-2 border-t  border-stone-400">
            <Text>Total</Text>
            <Text>{formatNumber(totalData.total)}</Text>
          </View>
          <View className="flex-row justify-between p-2 border-t  border-stone-400">
            <Text>Discount</Text>
            <Text>{formatNumber(0)}</Text>
          </View>
          <View className="flex-row justify-between p-2 border-t  border-stone-400">
            <Text>Affter Discount</Text>
            <Text>{formatNumber(totalData.total - 0)}</Text>
          </View>
        </View>
        <View>
          <Text className="p-2 pt-4 bg-neutral-400">BANK PAYMENT</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedOptionPayment("ATM")}
          >
            <View className="flex-row justify-between py-1 px-2 border-t border-stone-400 items-center">
              <View className="flex-row items-center">
                <Image
                  source={require("../assets/icons/credit-card.png")}
                  style={styles.iconPayment}
                />
                <Text className="pl-2">ATM Card (Vietnam Domestic)</Text>
              </View>
              {selectedOptionPayment === "ATM" && (
                <Ionicons name="checkmark-sharp" size={20} color={"red"} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedOptionPayment("CREDIT")}
          >
            <View className="flex-row justify-between px-2 border-t border-stone-400 items-center">
              <View className="flex-row items-center">
                <Image
                  source={require("../assets/icons/master-card.png")}
                  style={styles.iconPayment}
                />
                <View className="pl-2">
                  <Text>Credit Card (Visa, Master, American</Text>
                  <Text>Express, JCB)</Text>
                </View>
              </View>
              {selectedOptionPayment === "CREDIT" && (
                <Ionicons name="checkmark-sharp" size={20} color={"red"} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedOptionPayment("MOMO")}
          >
            <View className="flex-row justify-between py-1 px-2 border-t border-stone-400 items-center">
              <View className="flex-row items-center">
                <Image
                  source={require("../assets/icons/momo.png")}
                  style={styles.iconPayment}
                />
                <Text className="pl-2">Momo</Text>
              </View>
              {selectedOptionPayment === "MOMO" && (
                <Ionicons name="checkmark-sharp" size={20} color={"red"} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedOptionPayment("ZALOPAY")}
          >
            <View className="flex-row justify-between py-1 px-2 border-t border-stone-400 items-center">
              <View className="flex-row items-center">
                <Image
                  source={require("../assets/icons/zaloPay.png")}
                  style={styles.iconPayment}
                />
                <Text className="pl-2">ZaloPay</Text>
              </View>
              {selectedOptionPayment === "ZALOPAY" && (
                <Ionicons name="checkmark-sharp" size={20} color={"red"} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View className="p-2 bg-neutral-400">
          <Text>
            I agree to the{" "}
            <Text className="underline text-sky-600">Terms of Use</Text> and am
            purchasing tickets for age appropriate audience.
          </Text>
          <TouchableOpacity
            className="bg-red-700 rounded-full my-2 mx-4"
            onPress={handlePayment}
          >
            <Text className="p-2 text-center text-white font-medium">
              I agree and Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  movieImg: {
    width: 95,
    height: 140,
  },
  sumaryImg: {
    flex: 1,
    margin: 15,
    alignItems: "center",
  },
  sumaryTicket2: {
    flex: 3,
    marginVertical: 10,
    marginEnd: 10,
  },
  iconRate: {
    width: 20,
    height: 20,
  },
  iconPayment: {
    width: 30,
    height: 30,
  },
});

export default PaymentScreen;
