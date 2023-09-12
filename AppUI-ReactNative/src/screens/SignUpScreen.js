import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_END, signUpAcction } from "../redux/action/userAction";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { signUp } = useSelector((state) => state.user);
  const [email, SetEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [fullName, SetFullName] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (!validation()) {
      return;
    }
    dispatch(signUpAcction(email, phone, password, fullName));
  };
  const validation = () => {
    if (!fullName) {
      Alert.alert("Name is required!");
      return false;
    }
    if (!email) {
      Alert.alert("Email is required!");
      return false;
    }
    if (!phone) {
      Alert.alert("Phone is required!");
      return false;
    }
    if (!password) {
      Alert.alert("Password is required!");
      return false;
    }
    if (password != confirmPassword) {
      Alert.alert("Password and confirm password is not the same!");
      return false;
    }
    return true;
  };
  const handleSignUpEnd = () => {
    navigation.goBack();
    dispatch({ type: SIGN_UP_END });
  };

  useEffect(() => {
    if (signUp && signUp.isError) {
      Alert.alert(signUp.message);
    }
    if (signUp && signUp.isError === false) {
      return Alert.alert("", signUp.message, [
        // The "Yes" button
        {
          text: "OK",
          onPress: () => {
            handleSignUpEnd();
          },
        },
      ]);
    }
  }, [signUp]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#F3F3F3" />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "position" : "height"}
      >
        <ScrollView>
          <View className="mt-5 ml-3 flex-row items-center p-1">
            <TouchableOpacity onPress={() => handleSignUpEnd()}>
              <Ionicons name="arrow-back-outline" size={30} color={"#ED2B2A"} />
            </TouchableOpacity>
          </View>
          <View className="flex-1 py-3 px-5">
            <Text className="text-lg text-center">Sign Up</Text>
            <View>
              <View style={styles.inputField}>
                <Ionicons name="at" color="#666" size={20} />
                <TextInput
                  onChangeText={SetFullName}
                  value={fullName}
                  placeholder="Full name"
                  placeholderTextColor="grey"
                />
              </View>
              <View style={styles.inputField}>
                <Ionicons name="at" color="#666" size={20} />
                <TextInput
                  onChangeText={SetEmail}
                  value={email}
                  placeholder="Email"
                  placeholderTextColor="grey"
                />
              </View>
              <View style={styles.inputField}>
                <Ionicons name="at" color="#666" size={20} />
                <TextInput
                  onChangeText={SetPhone}
                  value={phone}
                  placeholder="Phone"
                  placeholderTextColor="grey"
                />
              </View>
              <View style={styles.inputField}>
                <Ionicons name="lock-closed-outline" color="#666" size={20} />
                <TextInput
                  onChangeText={SetPassword}
                  value={password}
                  placeholder="Passwrod"
                  placeholderTextColor="grey"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.inputField}>
                <Ionicons name="lock-closed-outline" color="#666" size={20} />
                <TextInput
                  onChangeText={SetConfirmPassword}
                  value={confirmPassword}
                  placeholder="Confirm password"
                  placeholderTextColor="grey"
                  secureTextEntry={true}
                />
              </View>
            </View>
            <TouchableOpacity
              className="bg-red-600 rounded-full p-3 mt-6"
              onPress={handleSignUp}
            >
              <Text className="text-lg text-center text-white">Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4"
              onPress={() => navigation.goBack()}
            >
              <Text className="text-right underline text-sky-600">
                Already have an account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderBottomColor: "#666",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 15,
    paddingBottom: 8,
    alignItems: "center",
  },
});

export default SignUpScreen;
