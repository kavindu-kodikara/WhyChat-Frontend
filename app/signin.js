import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import { registerRootComponent } from "expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as NavigationBar from "expo-navigation-bar";

export default function index() {
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  const [getMobilePlaseholder, setMobilePlaseholder] = useState("Mobile");
  const [getPassPlaseholder, setPassPlaseholder] = useState("Password");
  const [getMobileBorderColor, setMobileBorderColor] = useState(
    stylesheet.input1
  );
  const [getPassBorderColor, setPassBorderColor] = useState(stylesheet.input1);

  const [getMobilePlaseholderColor, setMobilePlaseholderColor] =
    useState("#a7a7a7");
  const [getPassPlaseholderColor, setPassPlaseholderColor] =
    useState("#a7a7a7");

  const logoPath = require("../assets/logo.png");

  const firstViewRef = useRef(null);
  const secondViewRef = useRef(null);
  const theredViewRef = useRef(null);
  const forthViewRef = useRef(null);


  NavigationBar.setButtonStyleAsync("dark");
  NavigationBar.setBackgroundColorAsync("white");

  useEffect(() => {
    // Start the first view's animation
    if (firstViewRef.current) {
      firstViewRef.current.transition(
        { opacity: 0, translateY: 40 },
        { opacity: 1, translateY: 0 },
        500,
        "ease-out"
      );
    }
    setTimeout(() => {
      if (secondViewRef.current) {
        secondViewRef.current.transition(
          { opacity: 0, translateY: 40 },
          { opacity: 1, translateY: 0 },
          500,
          "ease-out"
        );
      }
    }, 150);

    setTimeout(() => {
      if (theredViewRef.current) {
        theredViewRef.current.transition(
          { opacity: 0, translateY: 40 },
          { opacity: 1, translateY: 0 },
          500,
          "ease-out"
        );
      }
    }, 300);

    setTimeout(() => {
      if (forthViewRef.current) {
        forthViewRef.current.transition(
          { opacity: 0, translateY: 40 },
          { opacity: 1, translateY: 0 },
          500,
          "ease-out"
        );
      }
    }, 250);


  }, []);

  return (
    <View style={stylesheet.view1}>
      <StatusBar style="dark" backgroundColor="white" />
      <Image source={logoPath} style={stylesheet.img1} contentFit="contain" />

      <Text style={stylesheet.text3}>Why</Text>

      <Text style={stylesheet.slogan}>Welcome back your've</Text>
      <Text style={stylesheet.slogan}> been missed !</Text>

      <View style={stylesheet.vbd}>
        <Animatable.View ref={firstViewRef} style={stylesheet.animatedView}>
          <View style={stylesheet.viewinput}>
            <FontAwesome6
              name={"mobile-screen"}
              size={21}
              color="#28C7C7"
              style={{ marginBottom: 5 }}
            />
            <TextInput
              style={getMobileBorderColor}
              inputMode={"tel"}
              placeholder={getMobilePlaseholder}
              placeholderTextColor={getMobilePlaseholderColor}
              onPress={() => {
                setMobileBorderColor(stylesheet.input1);
                setMobilePlaseholder("Mobile");
                setMobilePlaseholderColor("#a7a7a7");
              }}
              onChangeText={(text) => {
                setMobile(text);
              }}
            />
          </View>
        </Animatable.View>

        <Animatable.View ref={secondViewRef} style={stylesheet.animatedView}>
          <View style={stylesheet.viewinput}>
            <FontAwesome6
              name={"lock"}
              size={21}
              color={"#28C7C7"}
              style={{ marginBottom: 5 }}
            />
            <TextInput
              style={getPassBorderColor}
              secureTextEntry={true}
              inputMode={"text"}
              placeholder={getPassPlaseholder}
              placeholderTextColor={getPassPlaseholderColor}
              onPress={() => {
                setPassPlaseholder("Password");
                setPassPlaseholderColor("#a7a7a7");
                setPassBorderColor(stylesheet.input1);
              }}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
        </Animatable.View>
      </View>

      <KeyboardAvoidingView>
        <Animatable.View ref={theredViewRef} style={stylesheet.animatedView}>
          <Pressable
            style={stylesheet.btn1}
            onPress={async () => {
              if (getMobile == "") {
                setMobilePlaseholder("Enter your mobile number ⓘ");
                setMobilePlaseholderColor("#ffa7a7");
                setMobileBorderColor(stylesheet.input2);
              }
              if (getPassword == "") {
                setPassPlaseholder("Enter your password ⓘ");
                setPassPlaseholderColor("#ffa7a7");
                setPassBorderColor(stylesheet.input2);
              }

              data = {
                mobile: getMobile,
                password: getPassword,
              };

              console.log(data);

              let response = await fetch(
                process.env.EXPO_PUBLIC_URL+"/user/sign_in",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json", 
                  },
                  body: JSON.stringify(data),
                }
              );

              console.log(response.ok);

              if (response.ok) {
                let json = await response.json();
                console.log(json);
                if (json.success) {
                  await AsyncStorage.setItem("user", JSON.stringify(json.user));
                  router.replace("/home");
                } else {
                  
                }
              } else {
                Alert.alert(
                  "Error",
                  "Something went wrong please try again later"
                );
              }
            }}
          >
            <Text style={stylesheet.text2}>Sign In</Text>
          </Pressable>
        </Animatable.View>

        <Animatable.View ref={forthViewRef} style={stylesheet.animatedView}>
          <Pressable
            onPress={() => {
              router.push("/signup");
            }}
          >
            <Text style={stylesheet.txt7}>
              Don't you have an account? Sign Up
            </Text>
          </Pressable>
        </Animatable.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  input1: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    fontSize: 15,
    marginTop: 20,
  },
  input2: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "red",
    fontSize: 17,
    marginTop: 20,
  },
  text1: {
    color: "black",
    fontSize: 20,
  },
  btn1: {
    backgroundColor: "#28C7C7",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: "100%",
    borderRadius: 10,
    marginTop: "15%",
    alignSelf: "center",
  },
  text2: {
    color: "white",
    fontSize: 22,
    justifyContent: "center",
    alignItems: "center",

    // fontFamily: "Fredoka",
  },

  text3: {
    color: "#014755",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  img1: {
    alignSelf: "center",
    width: 90,
    height: 90,
  },
  text4: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  txt7: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
  viewinput: {
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 20,
    alignItems: "flex-end",
    marginTop: 12,
  },
  textdot: {
    color: "#87E8F5",
  },
  textd: {
    color: "#87E8F5",
  },
  slogan: {
    fontSize: 18,
    alignSelf: "center",
    color: "#939393",
  },
  animatedView: {
    transform: [{ translateY: 40 }],
    opacity: 0,
  },
});
