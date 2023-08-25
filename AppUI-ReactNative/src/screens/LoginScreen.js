import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  // const {themeMode, error} = useSelector((state: any) => state.auth);
  // const {t} = useTranslation();
  const [account, onChangeAccount] = useState("");
  const [password, onChangePassword] = useState("");
  const backgroundStyle = {
    backgroundColor: "#F3F3F3",
  };
  const textColor = {
    color: "#222",
  };
  // const dispatch: Dispatch<any> = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (account && password) {
      // dispatch(AuthLogin(account.trim(), password));
      onChangeAccount("");
      onChangePassword("");
    } else {
      // Alert.alert(t('acc-pass-required'));
      Alert.alert("Email/phone or password is required!");
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     Alert.alert(t('log-in-error'));
  //   }
  // }, [error]);

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#F3F3F3" />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "position" : "height"}
      >
        <ScrollView>
          <View className="mt-5 flex-row items-center p-1">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={30} color={"#ED2B2A"} />
            </TouchableOpacity>
          </View>
          <View style={styles.loginContainer}>
            <View style={styles.imgContent}>
              <Image
                source={require("../assets/images/login.jpg")}
                style={styles.imgLogin}
              />
            </View>
            <View style={styles.tittle}>
              <Text style={[styles.textTittle, textColor]}>Login</Text>
              <Text style={textColor}>Description</Text>
            </View>
            <View style={styles.viewInput}>
              <View style={styles.inputField}>
                <Ionicons name="at" color="#666" size={20} />
                <TextInput
                  style={[styles.input, textColor]}
                  onChangeText={onChangeAccount}
                  value={account}
                  placeholder="Email or phone"
                  placeholderTextColor="grey"
                />
              </View>
              <View style={styles.inputField}>
                <Ionicons name="lock-closed-outline" color="#666" size={20} />
                <TextInput
                  style={[styles.input, textColor]}
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder="Passwrod"
                  placeholderTextColor="grey"
                  secureTextEntry={true}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
              <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>
            <Text style={[styles.textOther, textColor]}>or, Login with</Text>
            <View style={styles.otherLoginContent}>
              <TouchableOpacity style={styles.btnOtherLogin}>
                <Image
                  source={require("../assets/images/google.png")}
                  style={styles.iconOtherBtn}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnOtherLogin}>
                <Image
                  source={require("../assets/images/facebook.png")}
                  style={styles.iconOtherBtn}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnOtherLogin}>
                <Image
                  source={require("../assets/images/tiktok.png")}
                  style={styles.iconOtherBtn}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  tittle: {
    justifyContent: "center",
    marginVertical: 0,
    paddingBottom: 5,
  },
  textTittle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  btnLogin: {
    borderRadius: 10,
    backgroundColor: "#ED2B2A",
    textAlign: "center",
    padding: 10,
    marginTop: 15,
  },
  viewInput: {
    marginTop: 10,
  },
  loginContainer: {
    marginHorizontal: 25,
  },
  inputField: {
    borderBottomColor: "#666",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 10,
    paddingBottom: 8,
    alignItems: "center",
  },
  textLogin: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },
  imgLogin: {
    height: 200,
    width: 300,
  },
  imgContent: {
    alignItems: "center",
  },
  textOther: {
    textAlign: "center",
    marginTop: 10,
  },
  btnOtherLogin: {
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 10,
    marginEnd: 10,
  },
  iconOtherBtn: {
    width: 20,
    height: 20,
  },
  otherLoginContent: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default LoginScreen;
