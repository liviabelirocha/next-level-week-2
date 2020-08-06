import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import TeacherList from "../pages/TeacherList";
import Favourites from "../pages/Favourites";

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === "ios" ? 84 : 64,
        },
        tabStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: Platform.OS === "ios" ? 20 : 0,
        },
        safeAreaInsets: { bottom: 0 },
        iconStyle: {
          flex: 0,
          width: 20,
          height: Platform.OS === "ios" ? 24 : 20,
        },
        labelStyle: {
          fontFamily: "Archivo_700Bold",
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: "#fafafc",
        activeBackgroundColor: "#ebebf5",
        inactiveTintColor: "#c1bccc",
        activeTintColor: "#32264d",
      }}
    >
      <Screen
        options={{
          tabBarLabel: "Proffys",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-easel" size={size} color={color} />;
          },
        }}
        name="TeacherList"
        component={TeacherList}
      />
      <Screen
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-heart" size={size} color={color} />;
          },
        }}
        name="Favourites"
        component={Favourites}
      />
    </Navigator>
  );
}

export default StudyTabs;
