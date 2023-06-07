import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import MainStackNavigator from "./routes/router";
import axios from "axios";
//Redux
import { Provider } from "react-redux";
import store from "./redux/configureStore";
axios.defaults.baseURL =
  "https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api";
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator>
          <StatusBar />
        </MainStackNavigator>
      </NavigationContainer>
    </Provider>
  );
}
