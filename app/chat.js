import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
} from "react-native";

export default function Chat() {
  const logoPath = require("../assets/0715126969.png");
  const [getChatArray, setChatArray] = useState([]);
  const otheruser = useLocalSearchParams();
  const [getChatTxt, setChatTxt] = useState("");

  useEffect(() => {
    async function fetchChatArray() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);

      let response = await fetch(
        "http://192.168.1.103:8080/MiyaChat/LoadChat?logged_user_id=" +
          user.id +
          "&other_user_id=" +
          otheruser.other_user_id
      );
      if (response.ok) {
        let chatArray = await response.json();
        setChatArray(chatArray);
        
      }
    }

    
setInterval(()=>{
  fetchChatArray();

},1000)

  }, []);
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={stylesheet.container}  >
      <StatusBar style="dark" backgroundColor="#D8D2F8"/>
      <View style={stylesheet.prview}>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome6 name={"arrow-left"} size={20} color={"purple"} />
        </Pressable>
        <View style={stylesheet.prof}>
          <Image
            source={logoPath}
            style={stylesheet.img1}
            contentFit="contain"
          />
        </View>

        <View style={stylesheet.txtview}>
          <Text style={stylesheet.text1}>{otheruser.other_user_name}</Text>
          
        </View>
      </View>
      
      <View style={stylesheet.center_view}>
        <FlashList
        data={getChatArray}
        renderItem={({ item }) => (
          <View style={stylesheet.center_view}>
            <View style={item.side=="right"?stylesheet.view5_1:stylesheet.view5_2}>
              <Text style={stylesheet.text3}>{item.message}</Text>
              <View style={stylesheet.view6}>
                <Text style={stylesheet.text4}>{item.dateTime}</Text>
                <FontAwesome6
                  name={item.side=="right"?"check":""}
                  color={true ? "green" : "white"}
                  size={20}
                />
              </View>
            </View>

            
          </View>
        )}
        estimatedItemSize={200}
      /></View>

      <View style={stylesheet.view7}>
        <TextInput style={stylesheet.input1} inputMode={"text"}
        value={getChatTxt}
          onChangeText={(txt) => {

            setChatTxt(txt);
          }}/>
        <Pressable style={stylesheet.pressable}  onPress={async () => {
            console.log(getChatTxt);
            if (getChatTxt.length != 0) {
              let userJson = await AsyncStorage.getItem("user");
              let user = JSON.parse(userJson);
              console.log(user.id);

              console.log( user.id +
                "&other_user_id=" +
                otheruser.other_user_id +
                "&message="+getChatTxt)

              let response = await fetch(
                "http://192.168.1.103:8080/MiyaChat/SendChat?logged_user_id=" +
                user.id +
                "&other_user_id=" +
                otheruser.other_user_id +
                "&message="+getChatTxt
              );
              if (response.ok) {
                let json = await response.json();
                console.log(json);
                if (json.success) {
                  let chatArray = json.jsonChatArray;
                  setChatArray(chatArray);
                  setChatTxt("");
                }
              }
            }
          }}>
          <FontAwesome6 name={"paper-plane"} color={"black"} size={20} />
          
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  prview: {
    backgroundColor: "#D8D2F8",
    height: 70,
    width: "100%",
    padding: 15,
    rowGap: 60,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
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
  },
  text2: {
    color: "black",
    fontSize: 10,
  },
  img1: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  view5_1: {
    backgroundColor: "#DC9AEE",
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
    justifyContent: "center",
    alignSelf: "flex-end",
    rowGap: 5,
    height: 50,
    width: 200,
    borderBottomLeftRadius:20
  },
  view5_2: {
    backgroundColor: "#DC9AEE",
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 10,
    justifyContent: "center",
    alignSelf: "flex-start",
    rowGap: 5,
    height: 50,
    width: 200,
    borderBottomRightRadius:20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    
  
  },
  view6: {
    flexDirection: "row",
    columnGap: 10,
  },
  text3: {
    flexDirection: "row",
    columnGap: 10,
  },
  text4: {
    fontSize: 14,
  },
  view6: {
    flexDirection: "row",
    columnGap: 10,
  },
  input1: {
    height: 40,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 20,
    flex: 1,
    paddingStart: 10,
    backgroundColor: "#D8D2F8",

  },
  pressable: {
    backgroundColor: "#D8D2F8",
    borderRadius: 20,
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
    margin: 10,
  },
  center_view: {
    flex: 1,
    marginVertical: 20,
  },
});
