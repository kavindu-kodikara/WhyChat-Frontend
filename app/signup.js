import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Image,
  Alert,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import * as NavigationBar from "expo-navigation-bar";
import { FontAwesome6 } from "@expo/vector-icons";

export default function signup() {
  const logoPath = require("../assets/logo.png");

  const [getMobile, setMobile] = useState("");
  const [getFname, setFname] = useState("");
  const [getLname, setLname] = useState("");
  const [getPassword, setPassword] = useState("");

  const [getMobilePlaseholder, setMobilePlaseholder] = useState("Mobile");
  const [getPassPlaseholder, setPassPlaseholder] = useState("Password");
  const [getFnamePlaseholder, setFnamePlaseholder] = useState("First Name");
  const [getLnamePlaseholder, setLnamePlaseholder] = useState("Last Name");

  const [getMobileBorderColor, setMobileBorderColor] = useState(
    stylesheet.input1
  );
  const [getPassBorderColor, setPassBorderColor] = useState(stylesheet.input1);
  const [getFnameBorderColor, setFnameBorderColor] = useState(
    stylesheet.input1
  );
  const [getLnameBorderColor, setLnameBorderColor] = useState(
    stylesheet.input1
  );

  const [getMobilePlaseholderColor, setMobilePlaseholderColor] =
    useState("#a7a7a7");
  const [getPassPlaseholderColor, setPassPlaseholderColor] =
    useState("#a7a7a7");
  const [getFnamePlaseholderColor, setFnamePlaseholderColor] =
    useState("#a7a7a7");
  const [getLnamePlaseholderColor, setLnamePlaseholderColor] =
    useState("#a7a7a7");

  const firstViewRef = useRef(null);
  const secondViewRef = useRef(null);
  const theredViewRef = useRef(null);
  const forthViewRef = useRef(null);
  const fifthViewRef = useRef(null);
  const sixthViewRef = useRef(null);

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
    }, 100);

    setTimeout(() => {
      if (theredViewRef.current) {
        theredViewRef.current.transition(
          { opacity: 0, translateY: 40 },
          { opacity: 1, translateY: 0 },
          500,
          "ease-out"
        );
      }
    }, 200);

    setTimeout(() => {
      if (forthViewRef.current) {
        forthViewRef.current.transition(
          { opacity: 0, translateY: 40 },
          { opacity: 1, translateY: 0 },
          500,
          "ease-out"
        );
      }
    }, 300);

    setTimeout(() => {
      if (fifthViewRef.current) {
        fifthViewRef.current.transition(
          { opacity: 0, translateY: 40 },
          { opacity: 1, translateY: 0 },
          500,
          "ease-out"
        );
      }
    }, 400);

    setTimeout(() => {
      if (sixthViewRef.current) {
        sixthViewRef.current.transition(
          { opacity: 0, translateY: 40 },
          { opacity: 1, translateY: 0 },
          500,
          "ease-out"
        );
      }
    }, 500);
  }, []);

  return (
    <View style={stylesheet.view1}>
      <Image source={logoPath} style={stylesheet.img1} contentFit="contain" />

      <Text style={stylesheet.text4}>Why</Text>

      <Text style={stylesheet.text3}>Create And Account</Text>

      <View>
        <Animatable.View ref={firstViewRef} style={stylesheet.animatedView}>
          <View style={stylesheet.viewinput}>
            <FontAwesome6
              name={"id-badge"}
              size={21}
              color="#28C7C7"
              style={{ marginBottom: 5 }}
            />
            <TextInput
              style={getFnameBorderColor}
              inputMode={"text"}
              placeholder={getFnamePlaseholder}
              placeholderTextColor={getFnamePlaseholderColor}
              onPress={() => {
                setFnameBorderColor(stylesheet.input1);
                setFnamePlaseholder("First Name");
                setFnamePlaseholderColor("#a7a7a7");
              }}
              onChangeText={(text) => {
                setFname(text);
              }}
            />
          </View>
        </Animatable.View>

        <Animatable.View ref={secondViewRef} style={stylesheet.animatedView}>
          <View style={stylesheet.viewinput}>
            <FontAwesome6
              name={"id-badge"}
              size={21}
              color="#28C7C7"
              style={{ marginBottom: 5 }}
            />
            <TextInput
              style={getLnameBorderColor}
              inputMode={"text"}
              placeholder={getLnamePlaseholder}
              placeholderTextColor={getLnamePlaseholderColor}
              onPress={() => {
                setLnameBorderColor(stylesheet.input1);
                setLnamePlaseholder("Last Name");
                setLnamePlaseholderColor("#a7a7a7");
              }}
              onChangeText={(text) => {
                setLname(text);
              }}
            />
          </View>
        </Animatable.View>

        <Animatable.View ref={theredViewRef} style={stylesheet.animatedView}>
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

        <Animatable.View ref={forthViewRef} style={stylesheet.animatedView}>
          <View style={stylesheet.viewinput}>
            <FontAwesome6
              name={"lock"}
              size={21}
              color="#28C7C7"
              style={{ marginBottom: 5 }}
            />
            <TextInput
              style={getPassBorderColor}
              inputMode={"text"}
              placeholder={getPassPlaseholder}
              placeholderTextColor={getPassPlaseholderColor}
              secureTextEntry={true}
              onPress={() => {
                setPassBorderColor(stylesheet.input1);
                setPassPlaseholder("Password");
                setPassPlaseholderColor("#a7a7a7");
              }}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
        </Animatable.View>
      </View>

      <Animatable.View ref={fifthViewRef} style={stylesheet.animatedView}>
        <Pressable
          style={stylesheet.btn1}
          onPress={async () => {
            if (getFname == "") {
              setFnamePlaseholder("Enter your First name ⓘ");
              setFnamePlaseholderColor("#ffa7a7");
              setFnameBorderColor(stylesheet.input2);
            }

            if (getLname == "") {
              setLnamePlaseholder("Enter your Last name ⓘ");
              setLnamePlaseholderColor("#ffa7a7");
              setLnameBorderColor(stylesheet.input2);
            }

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
              fname: getFname,
              lname: getLname,
              mobile: getMobile,
              password: getPassword,
            };

            console.log(data);

            let response = await fetch(
              process.env.EXPO_PUBLIC_URL + "/user/sign_up",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", 
                },
                body: JSON.stringify(data),
              }
            );

            if (response.ok) {
              let json = await response.json();
              console.log(json);
              if (json.success) {
                router.replace("/");
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
          <Text style={stylesheet.text2}>Sign Up</Text>
        </Pressable>
      </Animatable.View>

      <Animatable.View ref={sixthViewRef} style={stylesheet.animatedView}>
        <Pressable
          onPress={() => {
            router.push("/signin");
          }}
        >
          <Text style={stylesheet.txt7}>Already Have an accout?Sign In</Text>
        </Pressable>
      </Animatable.View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
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
  },

  text3: {
    fontSize: 18,
    alignSelf: "center",
    color: "#939393",
  },
  img1: {
    alignSelf: "center",
    width: 90,
    height: 90,
    backgroundColor: "white",
  },
  text4: {
    color: "#014755",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  txt7: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
  viewinput: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 20,
    alignItems: "flex-end",
    marginTop: 12,
  },
  animatedView: {
    transform: [{ translateY: 40 }],
    opacity: 0,
  },
});
