import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import home from "../screens/home";
import Queue from "../screens/queueinfo";
import UserRegister from "../screens/register";
import Header from "../shared/header";
import Scan from "../screens/scan";
import Profile from "../screens/profile";
import Record from "../screens/record";
import Search from "../screens/search";
import Result from "../screens/result";
import PremiseInfo from "../screens/premiseInfo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
const Stack = createStackNavigator();
const mapDispatchToProps = (dispatch) => ({});
const MainStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#2699FB",
        height: 90,
      },
      headerTintColor: "#444",
    }}
  >
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={UserRegister}
      options={{
        headerShown: true,
        headerTitle: (props) => <Header {...props} />,
        headerTitleContainerStyle: {
          left: 0,
        },
      }}
    />
    <Stack.Screen
      name="Home"
      component={BottomTabNavigator}
      options={{
        headerTitle: (props) => <Header {...props} />,
        headerShown: true,
        headerLeft: null,
        gesturesEnabled: false,
      }}
    />
    <Stack.Screen
      name="Queue"
      component={Queue}
      options={{
        headerTitle: (props) => <Header {...props} />,
        headerShown: true,
        headerTitleContainerStyle: {
          left: 0,
        },
      }}
    />
    <Stack.Screen
      name="Search"
      component={Search}
      options={{
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Premise"
      component={PremiseInfo}
      options={{
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Result"
      component={Result}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

const ScanNavigator = () => (
  <Stack.Navigator
    initialRouteName="Scan"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#2699FB",
        height: 90,
      },

      headerTintColor: "#444",
    }}
  >
    <Stack.Screen
      name="Scan"
      component={Scan}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const ProfileNavigator = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#2699FB",
        height: 90,
      },
      headerTintColor: "#444",
    }}
  >
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const RecordNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#2699FB",
        height: 90,
      },
      headerTintColor: "#444",
    }}
  >
    <Stack.Screen
      name="Record"
      component={Record}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
export default connect(null, mapDispatchToProps)(MainStackNavigator);

import { StyleSheet } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        inactiveBackgroundColor: "#2699FB",
        activeBackgroundColor: "#2699FB",
        activeTintColor: "black",
        inactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Home"
        component={home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              style={styles.icon}
              name="home"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              style={styles.icon}
              name="qr-code"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Record"
        component={RecordNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              style={styles.icon}
              name="clipboard-flow"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome
              style={styles.icon}
              name="user"
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
