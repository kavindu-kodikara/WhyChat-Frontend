import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert,
} from "react-native";
import { closeWebSocket, getWebSocket } from "./WebSocketManager";

export default function Chat() {
  // const logoPath = require("../assets/0715126969.png");
  const [getChatArray, setChatArray] = useState([]);
  const otheruser = useLocalSearchParams();
  const [getChatTxt, setChatTxt] = useState("");
  const [getSocket, setSocket] = useState(null);

  const chtimage = require("../assets/userIcon.png");
  const backgroundImage = require("../assets/chatBackground.jpg");

  const flashListRef = useRef(null);
  useEffect(() => {
    if (flashListRef.current && getChatArray.length > 0) {
      flashListRef.current.scrollToEnd({ animated: true });
    }
  }, [getChatArray]);

  useEffect(() => {
    closeWebSocket();
    async function fetchChatArray() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);

      const mobileNumber = user.mobile;
      const logged_user_id = user.id;
      const other_user_id = otheruser.other_user_id;

      const socket = getWebSocket(process.env.EXPO_PUBLIC_WEBSOCKET_URL);
      setSocket(socket);

      socket.onopen = () => {
        console.log("Connection opened");

        socket.send(
          JSON.stringify({
            type: "chat",
            mobileNumber: mobileNumber,
            logged_user_id: logged_user_id,
            other_user_id: other_user_id,
          })
        );
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "chatData") {
          setChatArray(data.data);
        } else if (data.type === "sendChat") {
          setChatArray((getChatArray) => [...getChatArray, data.data]);
        } else if (data.type === "sendOtherUserChat") {
          setChatArray(data.data);
        }
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

    fetchChatArray();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={stylesheet.container}
    >
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={stylesheet.container}
      >
        <StatusBar style="dark" backgroundColor="white" />
        <View style={stylesheet.prview}>
          <Pressable
            onPress={() => {
              router.replace("/home");
            }}
          >
            <FontAwesome6 name={"arrow-left"} size={20} color={"black"} />
          </Pressable>
          <View style={stylesheet.prof}>
            <Image
              source={otheruser.avatar_image_found ? {uri:"http://192.168.8.155:8080/AvatarImages/"+otheruser.other_user_mobile+".png"} : chtimage}
              style={stylesheet.img1}
              contentFit="contain"
            />
          </View>

          <View style={stylesheet.txtview}>
            <Text style={stylesheet.text1}>{otheruser.other_user_name}</Text>
          </View>
          <View style={stylesheet.view0}>
            <FontAwesome6 name={"bars"} size={20} color={"black"} />
          </View>
        </View>

        <View style={stylesheet.center_view}>
          <FlashList
            ref={flashListRef}
            data={getChatArray}
            renderItem={({ item }) => (
              <View style={stylesheet.background_view}>
                <View
                  style={
                    item.side == "right"
                      ? stylesheet.view5_1
                      : stylesheet.view5_2
                  }
                >
                  <Text style={stylesheet.text3}>{item.message}</Text>
                  <View style={stylesheet.view6}>
                    <Text style={stylesheet.text4}>{item.dateTime}</Text>
                    <FontAwesome6
                      name={
                        item.side == "right"
                          ? item.status == 1
                            ? "check-double"
                            : "check"
                          : ""
                      } //check-double
                      color={item.status == 1 ? "#13bffe" : "#788C75"}
                      size={20}
                    />
                  </View>
                </View>
              </View>
            )}
            estimatedItemSize={200}
          />
        </View>

        <View style={stylesheet.view7}>
          <TextInput
            style={stylesheet.input1}
            inputMode={"text"}
            value={getChatTxt}
            placeholder="Message"
            onChangeText={(txt) => {
              setChatTxt(txt);
            }}
          />
          <Pressable
            style={stylesheet.pressable}
            onPress={async () => {
              if (getChatTxt.length != 0) {
                let userJson = await AsyncStorage.getItem("user");
                let user = JSON.parse(userJson);

                getSocket.send(
                  JSON.stringify({
                    type: "sendChat",
                    logged_user_id: user.id,
                    other_user_id: otheruser.other_user_id,
                    message: getChatTxt,
                  })
                );

                getSocket.onmessage = (event) => {
                  const data = JSON.parse(event.data);
                  if (data.type == "sendChat") {
                    setChatArray((getChatArray) => [
                      ...getChatArray,
                      data.data,
                    ]);
                  }
                };

                setChatTxt("");
              }
            }}
          >
            <FontAwesome6 name={"play"} color={"white"} size={20} />
          </Pressable>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  prview: {
    backgroundColor: "white",
    height: "auto",
    width: "100%",
    paddingTop: 0,
    padding: 15,
    rowGap: 60,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    shadowColor: "#000",
    elevation: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  prof: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    color: "black",
    fontSize: 23,
    marginLeft: 10,
  },
  text2: {
    color: "#28C7C7",
    fontSize: 10,
  },
  img1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  view5_1: {
    backgroundColor: "#D9FDD3",
    borderTopLeftRadius: 20,
    marginHorizontal: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
    alignSelf: "flex-end",
    height: "auto",
    width: "auto",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    rowGap: 3,
  },
  view5_2: {
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
    alignSelf: "flex-start",
    height: "auto",
    width: "auto",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    rowGap: 3,
  },
  view6: {
    flexDirection: "row",
    columnGap: 10,
  },
  text3: {
    flexDirection: "row",
    columnGap: 10,
    fontSize: 18,
  },
  text4: {
    fontSize: 12,
    color: "#727272",
  },
  view6: {
    flexDirection: "row",
    columnGap: 10,
  },
  input1: {
    height: 50,
    borderRadius: 25,
    fontSize: 20,
    flex: 1,
    paddingStart: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    elevation: 3,
  },
  pressable: {
    backgroundColor: "#28C7C7",
    borderRadius: 25,
    width: 50,
    height: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  view7: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 18,
    paddingHorizontal: 20,
    marginTop: 0,
    margin: 10,
  },
  center_view: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: "transparent",
  },
  background_view: {
    flex: 1,
    marginVertical: 5,
  },
  view0: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
    flex: 1,
  },
});
