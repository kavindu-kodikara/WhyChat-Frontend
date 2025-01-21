import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
//import { Image } from "expo-image";
import { FontAwesome6 } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { closeWebSocket, getWebSocket } from "./WebSocketManager";

export default function Home() {
  const [getChatArray, setChatArray] = useState([]);
  const [getName, setName] = useState("");

  const chtimage = require("../assets/userIcon.png");

  NavigationBar.setButtonStyleAsync("dark");
  NavigationBar.setBackgroundColorAsync("white");

  useEffect(() => {
    closeWebSocket();
    async function fetchData() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);

      const mobileNumber = user.mobile;
      const socket = getWebSocket(
        process.env.EXPO_PUBLIC_WEBSOCKET_URL +
          "?type=register&mobileNumber=" +
          mobileNumber
      );

      socket.onopen = () => {
        console.log("Connection opened");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        let chatArray = data.jsonChatArray;
        setChatArray(chatArray);
        // console.log(data);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error: ", error.message);
        console.error("WebSocket error: ", JSON.stringify(error));
      };

      socket.onclose = () => {
        console.log("Connection closed");
      };

      return () => {
        closeWebSocket();
      };
    }

    fetchData();
  }, []);

  return (
    <View style={stylesheet.container}>
      <StatusBar style="black" backgroundColor="white" />
      <View style={stylesheet.view2}>
        <View style={stylesheet.titleSubView1}>
          <Text style={stylesheet.titleTxt}>Why</Text>
        </View>
        <View style={stylesheet.titleSubView2}>
          <FontAwesome6 name={"magnifying-glass"} size={20} color={"black"} />
          <Pressable onPress={()=>{
            router.push("/profile");
          }}>
            <FontAwesome6 name={"bars"} size={20} color={"black"} />
          </Pressable>
        </View>
      </View>
      <FlashList
        data={getChatArray}
        renderItem={({ item }) => (
          <Pressable
            style={stylesheet.chatContainer}
            onPress={() => {
              router.push({ pathname: "/chat", params: item });
            }}
          >
            <View style={stylesheet.chat}>
              <View
                style={
                  item.other_user_status == 2
                    ? stylesheet.view6_offline
                    : stylesheet.view6_online
                }
              >
                <Image
                  source={item.avatar_image_found ? {uri:"http://192.168.8.155:8080/AvatarImages/"+item.other_user_mobile+".png"} : chtimage}
                  style={stylesheet.img1}
                  contentFit="contain"
                />
              </View>
              <View style={stylesheet.View4}>
                <View style={stylesheet.view8}>
                  <View style={stylesheet.chatTxtView}>
                    <Text style={stylesheet.chatName}>
                      {item.other_user_name}
                    </Text>
                  </View>
                  <View style={stylesheet.chatTxtView}>
                    {item.chat_status_id == 2 ? (
                      <FontAwesome6
                        name={"check"}
                        color={"#788C75"}
                        size={18}
                      />
                    ) : (
                      <FontAwesome6
                        name={"check-double"}
                        color={"#13bffe"}
                        size={18}
                      />
                    )}

                    {/* <FontAwesome6 name={"clock"} color={"#13bffe"} size={18} /> */}
                    <Text style={stylesheet.txt4} numberOfLines={1}>
                      {item.message}
                    </Text>
                  </View>
                </View>
                <View style={stylesheet.view7}>
                  <View
                    style={
                      parseInt(item.unseen_chat_count) > 0
                        ? stylesheet.chatTimeView
                        : stylesheet.chatTimeView2
                    }
                  >
                    <Text style={stylesheet.txt5}>{item.dateTime}</Text>
                  </View>

                  <View
                    style={
                      parseInt(item.unseen_chat_count) > 0
                        ? stylesheet.chatCountView
                        : stylesheet.chatCountView2
                    }
                  >
                    <View style={stylesheet.countView}>
                      <Text style={stylesheet.countTxt}>
                        {item.unseen_chat_count}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        )}
        estimatedItemSize={200}
      />
      <View style={stylesheet.bottemView}>
        <View style={stylesheet.titleSubView3}>
          <View style={stylesheet.flex1}>
            <FontAwesome6 name={"spinner"} size={24} color={"#28C7C7"} />
          </View>
          <View style={stylesheet.flex1}>
            <FontAwesome6 name={"comment"} size={24} color={"#28C7C7"} />
          </View>
          <View style={stylesheet.flex1}>
            <FontAwesome6 name={"user"} size={24} color={"#28C7C7"} />
          </View>
        </View>
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 0,
  },

  view2: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    padding: 7,
    paddingTop: 0,
  },
  bottemView: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
  titleSubView1: {
    flex: 2,
  },
  titleSubView2: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    columnGap: 30,
  },

  View3: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  titleTxt: {
    fontSize: 30,
    fontWeight: "bold",

    color: "#28C7C7",
  },

  chatName: {
    fontSize: 18,
    color: "#2E1833",
    fontWeight: "bold",
  },

  txt2: {
    fontSize: 16,
    color: "white",
  },

  txt3: {
    fontSize: 14,
    alignSelf: "flex-end",
    color: "white",
  },

  chat: {
    flexDirection: "row",
    columnGap: 10,
    paddingVertical: 10,
  },
  chatContainer: {
    height: 80,
  },
  view6_offline: {
    width: 66,
    height: 66,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  view6_online: {
    width: 66,
    height: 66,
    borderRadius: 35,
    backgroundColor: "#00ff1a",
    justifyContent: "center",
    alignItems: "center",
  },

  txt4: {
    fontSize: 16,
    color: "#8e8e8e",
    marginLeft: 10,
  },
  txt5: {
    fontSize: 14,
    color: "#2E1833",
  },
  View4: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#28C7C7",
  },
  view7: {
    columnGap: 10,
    flex: 1,
  },
  view8: {
    flex: 3,
  },
  chatTxtView: {
    height: "50%",
    alignItems: "center",
    flexDirection: "row",
  },
  chatTimeView: {
    height: "50%",
    alignItems: "center",
    flexDirection: "row",
  },
  chatTimeView2: {
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  chatCountView: {
    height: "50%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chatCountView2: {
    display: "none",
  },
  countView: {
    backgroundColor: "#28C7C7",
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  countTxt: {
    color: "white",
    fontWeight: "bold",
  },
  img1: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  titleSubView3: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
