import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { Image } from "expo-image";
import { registerRootComponent } from "expo";
import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [getImage, setImage] = useState(null);

  NavigationBar.setButtonStyleAsync("dark");
  NavigationBar.setBackgroundColorAsync("white");

  const [getFname, setFname] = useState("");
  const [getLname, setLname] = useState("");
  const [getid, setid] = useState("");
  const [getPassword, setPassword] = useState("");

  useEffect(() => {
    async function fetchChatArray() {
      console.log("hi");
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);

      let response = await fetch(
        process.env.EXPO_PUBLIC_URL +"/profile/check-profile-image?mobile=" +user.mobile
      );
      if (response.ok) {
        let json = await response.json();
        console.log(json);
        if(json.foundImg){
          console.log("found");
            setImage({uri:"http://192.168.8.155:8080/AvatarImages/"+user.mobile+".png"+ `?timestamp=${new Date().getTime()}`});
        }else{
          setImage(require("../assets/userIcon.png"));
        }
      }

      setFname(user.fname);
      setLname(user.lname);
      setPassword(user.password);
      setid(user.id);
    }

    fetchChatArray();
  }, []);

  return (
    <View style={stylesheet.container}>
       <StatusBar style="black" backgroundColor="white" />
      <View style={stylesheet.headerView}>
        <Pressable
          style={stylesheet.backBtn}
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome6 name={"chevron-left"} color={"black"} size={20} />
        </Pressable>
        <Text style={stylesheet.logoTxt}>My Profile</Text>
      </View>

      <Pressable
        style={stylesheet.logoView}
        onPress={async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
          });

          console.log(result);

          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        }}
      >
        <Image
          source={getImage}
          style={stylesheet.logoImg}
          contentFit="contain"
        />
      </Pressable>

      <Text style={stylesheet.inputTxt}>First name</Text>
      <TextInput
        value={getFname}
        style={stylesheet.input}
        onChangeText={(txt) => {
          setFname(txt);
        }}
      />

      <Text style={stylesheet.inputTxt}>Last Name</Text>
      <TextInput
        value={getLname}
        style={stylesheet.input}
        onChangeText={(txt) => {
          setLname(txt);
        }}
      />

      <Text style={stylesheet.inputTxt}>Password</Text>
      <TextInput
        value={getPassword}
        style={stylesheet.input}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
      />

      <Pressable
        style={stylesheet.btn}
        onPress={async () => {
          const form = new FormData();
          form.append("fname", getFname);
          form.append("lname", getLname);
          form.append("password", getPassword);
          form.append("avatarImage", {
            name: "avatar.png",
            type: "image/png",
            uri: getImage,
          });
          form.append("id", getid);

          // console.log(form);

          let response = await fetch(process.env.EXPO_PUBLIC_URL + "/profile/update-user", {
            method: "POST",
            body: form,
          });

          if (response.ok) {
            let json = await response.json();

            console.log(json);

            if (json.success) {
              try {
                router.replace("/profile");
              } catch (error) {
                Alert.alert("Error", "Something went wrong please try again");
                console.log(error);
              }
            } else {
              Alert.alert("Error", json.message);
            }
          } else {
            Alert.alert("Error", "Something went wrong please try again later");
          }
        }}
      >
        <Text style={stylesheet.btnTxt}>Save</Text>
      </Pressable>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    rowGap: 10,
  },
  headerView: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
  },

  inputTxt: {
    fontSize: 18,
  },

  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: "#44646e",
    paddingHorizontal: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
  },
  btn: {
    backgroundColor: "#28C7C7",
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnTxt: {
    color: "white",
    fontSize: 20,
  },
  logoImg: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  logoTxt: {
    fontSize: 18,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  txt1: {
    textAlign: "center",
    marginTop: 10,
  },
});
