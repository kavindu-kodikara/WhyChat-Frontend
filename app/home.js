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

export default function Home() {
  SplashScreen.preventAutoHideAsync();

 
  
  const [getChatArray, setChatArray] = useState([]);
  const[getName,setName] = useState(""); 
  //const chtimage =  require("../assets/0715126969.png");
  const [loaded, error] = useFonts({
    FredokaLight: require("../assets/fonts/Fredoka-Light.ttf"),
    FredokaMedium: require("../assets/fonts/Fredoka.ttf"),
    FredokaSemiBold: require("../assets/fonts/Fredoka-SemiBold.ttf"),
    DancingScript_VariableFont_wght: require("../assets/fonts/DancingScript-VariableFont_wght.ttf"),
    //LogoFont: require("../assets/fonts/LogoFont.ttf"),
  });

  useEffect(() => {
    async function FetchData() {
      console.log("ok");
      let userJson = await AsyncStorage.getItem("user");
      
      let user = JSON.parse(userJson);
       console.log(user.id);
       setName(user.fname)
      let response = await fetch(
        process.env.EXPO_PUBLIC_URL+"/LoadHomeData?id="+user.id
      );

      if (response.ok) {
        let json = await response.json();
        console.log(json)
        if (json.success) {
          console.log("hey bb")
          let chatArray = json.jsonChatArray;
          setChatArray(chatArray);
          
        }
      }
    }
    FetchData();
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
    <View style={stylesheet.container}>
      <StatusBar style="light" backgroundColor="black" />
      <View style={stylesheet.view2}>
        <View style={stylesheet.titleSubView1}>
          <Text style={stylesheet.titleTxt}>Why</Text>
        </View>
        <View style={stylesheet.titleSubView2}>
        <FontAwesome6 name={"magnifying-glass"} size={20} color={"#28C7C7"} />
          <FontAwesome6 name={"bars"} size={20} color={"#28C7C7"} />
        </View>
      </View>
      <FlashList
        data={getChatArray}
        renderItem={({ item }) => (
          <Pressable style={stylesheet.chatContainer} onPress={()=>{
            router.push({pathname:"/chat",params:item})
          }}>
            <View style={stylesheet.chat}>
              <View style={stylesheet.view6}>
              <Image
            //source={chtimage}
            style={stylesheet.img1}
            contentFit="contain"
          />
                            </View>
              <View style={stylesheet.View4}>
                <View style={stylesheet.view8}>
                  <View style={stylesheet.chatTxtView}>
                    <Text style={stylesheet.chatName}>{item.other_user_name}</Text>
                  </View>
                  <View style={stylesheet.chatTxtView}>
                    {item.chat_status_id == 2 ? <FontAwesome6 name={"check"} color={"#13bffe"} size={18} /> :  <FontAwesome6 name={"check-double"} color={"#13bffe"} size={18} />}
                    
                   
                    {/* <FontAwesome6 name={"clock"} color={"#13bffe"} size={18} /> */}
                    <Text style={stylesheet.txt4} numberOfLines={1}>
                      {item.message}
                    </Text>
                  </View>
                </View>
                <View style={stylesheet.view7}>
                  <View style={stylesheet.chatTimeView}>
                    <Text style={stylesheet.txt5}>{item.dateTime}</Text>
                  </View>
                  
                </View>
              </View>
            </View>
          </Pressable>
        )}
        estimatedItemSize={200}
      />
     

      
       
      
    </View>
  );
  
}

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,

  },

  view2: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    marginBottom: 15,
    padding: 7,
    paddingTop: 0,
  },
  titleSubView1: {
    flex: 2,
  },
  titleSubView2: {
    flex: 2,
    flexDirection:"row",
    justifyContent:"flex-end",
   columnGap:20
  },

  View3: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  titleTxt: {
    fontSize: 30,
    
    
    color:"#28C7C7"
  },

  chatName: {
    fontSize: 18,
    color: "#2E1833",
    fontWeight: "bold",
  },

  txt2: {
    fontFamily: "FredokaLight",
    fontSize: 16,
    color: "white",
  },

  txt3: {
    fontFamily: "FredokaLight",
    fontSize: 14,
    alignSelf: "flex-end",
    color: "white",
  },

  chat: {
    flexDirection: "row",
    marginVertical: 10,
    columnGap: 15,
    backgroundColor: "white",
    padding: 8,
    paddingStart: 15,
    borderRadius: 15,
   
  },
  chatContainer: {
    marginBottom: 10,
    height: 80,
  },
  view6: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent:"center",
    alignItems:"center"
  },

  txt4: {
    fontSize: 16,
    color: "#2E1833",
    marginLeft: 10,
  },
  txt5: {
    fontSize: 14,
    color: "#2E1833",
  },
  View4: {
    flex: 1,
    flexDirection: "row",
    borderColor:"#28C7C7",
    
    
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
  countView: {
    backgroundColor: "#B729E5",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  countTxt: {
    fontFamily: "FredokaMedium",
    color: "white",
  },
  img1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor:"#CFECF7",
  },
});
