import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { registerRootComponent } from "expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function signin() {
  SplashScreen.preventAutoHideAsync();

  const logoPath = require("../assets/abcd.jpg");

  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  const [loaded, error] = useFonts({
    // FredokaLight: require("../assets/fonts/Fredoka-Light.ttf"),
    // Fredoka: require("../assets/fonts/Fredoka.ttf"),
    // FredokaSemiBold: require("../assets/fonts/Fredoka-SemiBold.ttf"),
    // DancingScript_VariableFont_wght: require("../assets/fonts/DancingScript-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    async function cheackuser() {
      try {
        let userJson = await AsyncStorage.getItem("user");
        if (userJson != null) {
          router.replace("/home");
        }
      } catch (e) {
        console.log(e);
      }
    }
    cheackuser();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={stylesheet.view1}>
      <StatusBar style="dark" backgroundColor="white" />
      <Image source={logoPath} style={stylesheet.img1} contentFit="contain" />

      <Text style={stylesheet.text4}>Why</Text>

      <Text style={stylesheet.text3}>Sign In</Text>

      <Text style={stylesheet.text1}>Mobile</Text>
      <TextInput
        style={stylesheet.input1}
        inputMode={"tel"}
        onChangeText={(text) => {
          setMobile(text);
        }}
      />

      <Text style={stylesheet.text1}>Password</Text>
      <TextInput
        style={stylesheet.input1}
        secureTextEntry={true}
        inputMode={"text"}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />

      <Pressable
        onPress={async () => {
          data = {
            mobile: getMobile,
            password: getPassword,
          };

          console.log(data);

          let response = await fetch(process.env.EXPO_PUBLIC_URL + "/SignIn", {
            method: "POST",
            body: JSON.stringify(data),
          });

          console.log(response.ok);

          if (response.ok) {
            let json = await response.json();
            console.log(json);
            if (json.success) {
              await AsyncStorage.setItem("user", JSON.stringify(json.user));
              router.replace("/home");
            } else {
              Alert.alert("Error", json.message);
            }
          } else {
            Alert.alert("Error", "Something went wrong please try again later");
          }
        }}
      >
        <LinearGradient
          style={stylesheet.btn1}
          start={{ x: 0.1, y: 0.1 }}
          colors={["#04ECFF", "#02ACFE"]}
        >
          <Text style={stylesheet.text2}>Sign In</Text>
        </LinearGradient>
      </Pressable>
      <Pressable
        onPress={() => {
          router.replace("/signup");
        }}
      >
        <Text style={stylesheet.txt7}>
          Don't you have an account?create Account
        </Text>
      </Pressable>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    rowGap: 10,
  },
  input1: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    rowGap: 10,
    padding: 10,
    borderRadius: 10,
  },
  text1: {
    color: "black",
    fontSize: 20,
    // fontFamily: "Fredoka-Light",
  },
  btn1: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderRadius: 25,
    marginTop: 20,
  },
  text2: {
    color: "white",
    fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
    // fontFamily: "Fredoka",
  },

  text3: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    // fontFamily: "FredokaSemiBold",
  },
  img1: {
    alignSelf: "center",
    width: 80,
    height: 80,
  },
  text4: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    // fontFamily: "DancingScript_VariableFont_wght",
  },
  txt7: {
    color: "black",
    textAlign: "center",
  },
});
