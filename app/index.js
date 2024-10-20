import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
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
import { Image } from "expo-image";
import { Video } from "expo-av";
import * as NavigationBar from "expo-navigation-bar";

import React, { useRef } from "react";
import * as Animatable from "react-native-animatable";

export default function index() {
  NavigationBar.setButtonStyleAsync("dark");
  NavigationBar.setBackgroundColorAsync("white");

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

  const firstViewRef = useRef(null);

  useEffect(() => {
    // Start the first view's animation
    firstViewRef.current.transition(
      { opacity: 0, translateY: 70 },
      { opacity: 1, translateY: 0 },
      500,
      "ease-out"
    );

  }, []);



  return (
    <View style={stylesheet.view1}>
      <StatusBar style="dark" backgroundColor="white" />

      <Video
        source={require("../assets/Conversation.mp4")}
        style={stylesheet.img1}
        shouldPlay
        isLooping={false}
        resizeMode="cover"
      />

      <Animatable.View ref={firstViewRef}>
        <Text style={stylesheet.text4}>
          Enjoy the new experience of chatting with global friends
        </Text>
      
        <Text style={stylesheet.txt7}>
          Connect people around the world for free
        </Text>
      
        <Pressable
          style={stylesheet.btn1}
          onPress={() => {
            router.push("/signin");
          }}
        >
          <Text style={stylesheet.text2}>Get started</Text>
        </Pressable>

      </Animatable.View>

    </View>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    padding: 15,
    rowGap: 10,
    alignItems: "center",
  },
  btn1: {
    backgroundColor: "#28C7C7",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 180,
    borderRadius: 25,
    marginTop: 30,
    alignSelf:"center"
  },
  text2: {
    color: "white",
    fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  img1: {
    alignSelf: "center",
    width: 500,
    height: 550,
  },
  text4: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  txt7: {
    fontSize: 15,
    color: "#9A9A9A",
    textAlign: "center",
    marginTop: 10,
  },
});
