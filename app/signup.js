import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Image,
  Alert
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { router } from "expo-router";


export default function signup() {
  SplashScreen.preventAutoHideAsync();

  const logoPath = require("../assets/abcd.jpg");

  const [getMobile, setMobile] = useState("");
  const [getFname, setFname] = useState("");
  const [getLname, setLname] = useState("");
  const [getPassword, setPassword] = useState("");

  const [loaded, error] = useFonts({
    FredokaLight: require("../assets/fonts/Fredoka-Light.ttf"),
    Fredoka: require("../assets/fonts/Fredoka.ttf"),
    FredokaSemiBold: require("../assets/fonts/Fredoka-SemiBold.ttf"),
    DancingScript_VariableFont_wght: require("../assets/fonts/DancingScript-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <View style={stylesheet.view1}>
      <Image source={logoPath} style={stylesheet.img1} contentFit="contain" />

      <Text style={stylesheet.text4}>Why</Text>

      <Text style={stylesheet.text3}>Create And Account</Text>

      <Text style={stylesheet.text1}>Mobile</Text>
      <TextInput
        style={stylesheet.input1}
        inputMode={"tel"}
        onChangeText={(text) => {
          setMobile(text);
        }}
      />

      <Text style={stylesheet.text1}>First Name</Text>
      <TextInput
        style={stylesheet.input1}
        inputMode={"text"}
        onChangeText={(text) => {
          setFname(text);
        }}
      />

      <Text style={stylesheet.text1}>Last Name</Text>
      <TextInput
        style={stylesheet.input1}
        inputMode={"text"}
        onChangeText={(text) => {
          setLname(text);
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
        style={stylesheet.btn1}
        onPress={async () => {
          

          data = {
            fname: getFname,
            lname: getLname,
            mobile: getMobile,
            password: getPassword,
          };

          console.log(data);

          let response = await fetch(
            "http://192.168.1.103:8080/MiyaChat/SignUp",
            {
              method: "POST",
              body: JSON.stringify(data),
            }
          );

          if (response.ok) {
            let json = await response.json();
             console.log(json);
            if (json.success) {
              router.replace("/")
            } else {
              Alert.alert("Error", json.message);
            }
          } else {
            Alert.alert("Error", "Something went wrong please try again later");
          }
        }}
      >
        <Text style={stylesheet.text2}>Sign Up</Text>
      </Pressable>
      <Pressable onPress={
        ()=>{
          router.replace("/")
        }
      } >
        <Text style={stylesheet.txt7} >Already Have an accout?Sign In</Text>
      </Pressable>
    </View>
  );
}



const stylesheet = StyleSheet.create({
  view1: {
    backgroundColor: "#CFECF7",
    flex: 1,
    justifyContent: "center",
    padding: 10,
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
    fontFamily: "Fredoka-Light",
  },
  btn1: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderRadius: 10,
    marginTop: 20,
  },
  text2: {
    color: "black",
    fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Fredoka",
  },

  text3: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "FredokaSemiBold",
  },
  img1: {
    alignSelf: "center",
    width: 80,
    height: 80,
    backgroundColor:"white"
  },
  text4: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "DancingScript_VariableFont_wght",
  },
  txt7:{
    color:"black",
    textAlign:"center"
  }
});
