import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderScreen from "../components/HeaderScreen";
import PopcornItem from "../components/PopcornItem";
import TotalComponent from "../components/TotalComponent";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  PopComboSelected,
  UpdateTotalData,
} from "../redux/action/cinemaAction";
import { getPopcornCombo } from "../services/CinemaService";
import { SafeAreaView } from "react-native-safe-area-context";

const PopcornScreen = () => {
  const navigation = useNavigation();
  const [popcornList, setPopcornList] = useState([]);
  const [totalD, setTotalD] = useState({});
  const [popcornSelected, setPopcornSelected] = useState([]);

  const { totalData, popComboSelected, screen } = useSelector(
    (state) => state.cinema
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // caculator total item SeatsSelected, money
    caculator();
  }, [popcornSelected]);

  useEffect(() => {
    fetchPopcorn();
  }, [screen.seatSelected]);

  const handleNavigate = () => {
    navigation.navigate("Payment");
    dispatch(UpdateTotalData(totalD));
    dispatch(PopComboSelected(popcornSelected));
  };

  const caculator = () => {
    let totalTmp = {
      ...totalData,
    };

    if (popcornSelected && popcornSelected.length > 0) {
      popcornSelected.map((p) => {
        totalTmp.detail += " + " + p.comboName;
        totalTmp.total += p.price * p.amount;
      });
    } else {
      totalTmp.detail = totalData.detail;
      totalTmp.total = totalData.total;
    }
    console.log("check popcorn select ", totalTmp);
    setTotalD(totalTmp);
  };

  const fetchPopcorn = async () => {
    let res = await getPopcornCombo();
    console.log("check res fetch popcorn ", res);
    if (res.result && res.resultList) {
      res.resultList.map((r) => {
        r.amount = 0;
        if (popComboSelected && popComboSelected.length > 0) {
          popComboSelected.map((p) => {
            if (p.id === r.id) {
              r.amount = p.amount;
            }
          });
        }
      });
      console.log("check res fetch popcorn ", res.resultList);
      setPopcornList(res.resultList);
    } else {
      //An error occurred within the server.
      Alert.alert("An error occurred within the server.");
    }
  };

  const btnChangeAmount = (mode = 0, id) => {
    let popCombo = [...popcornList];
    let comboSelected = [];
    popCombo.map((pop) => {
      if (pop.id === id) {
        if (!pop.amount) {
          pop.amount = 0;
        }
        if (mode === 1) {
          pop.amount += 1;
        } else {
          if (pop.amount <= 0) {
            return;
          }
          pop.amount += -1;
        }
      }
      if (pop.amount > 0) {
        comboSelected.push(pop);
      }
    });
    console.log("popcorn list ", popCombo);
    console.log("popcorn selected ", comboSelected);
    setPopcornList(popCombo);
    setPopcornSelected(comboSelected);
  };

  return (
    <SafeAreaView className="bg-red-600 flex-1">
      {/* Header screen */}
      <View className="bg-slate-200">
        <HeaderScreen title="Popcorn & Drink" />
      </View>

      <View className="flex-1 bg-slate-200">
        {/* <PopcornItem /> */}
        <FlatList
          data={popcornList}
          renderItem={({ item }) => (
            <PopcornItem data={item} btnChangeAmount={btnChangeAmount} />
          )}
          keyExtractor={(item) => "popcorn" + item.id}
        />
      </View>
      <TotalComponent
        data={totalD}
        btnTitle={"Payment"}
        handleBtnTotal={handleNavigate}
      />
    </SafeAreaView>
  );
};

export default PopcornScreen;
