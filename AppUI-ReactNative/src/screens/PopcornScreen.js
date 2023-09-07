import { View, SafeAreaView, FlatList } from "react-native";
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

const PopcornScreen = () => {
  const navigation = useNavigation();
  const [popcornList, setPopcornList] = useState([]);
  const [totalD, setTotalD] = useState({});

  const { totalData, popComboSelected } = useSelector((state) => state.cinema);
  const dispatch = useDispatch();

  useEffect(() => {
    // caculator total item SeatsSelected, money
    caculator();
  }, [popComboSelected]);

  useEffect(() => {
    fetchPopcorn();
  }, []);

  const handleNavigate = () => {
    navigation.navigate("Payment");
    dispatch(UpdateTotalData(totalD));
  };

  const caculator = () => {
    let totalTmp = {
      ...totalData,
    };

    if (popComboSelected && popComboSelected.length > 0) {
      popComboSelected.map((p) => {
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
      setPopcornList(res.resultList);
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

    setPopcornList(popCombo);
    dispatch(PopComboSelected(comboSelected));
  };

  return (
    <SafeAreaView className="bg-slate-200 flex-1 mt-6">
      {/* Header screen */}
      <HeaderScreen title="Popcorn & Drink" />

      <View className="flex-1">
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
