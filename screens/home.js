import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
export default function Home({ navigation }) {
  const state = useSelector((state) => state.user);
  return (
    <View style={globalStyles.container}>
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>WELCOME,</Text>
        <View>
          <Text style={styles.usernameText}>
            {state.fullName != "" ? state.fullName : GG}
          </Text>
        </View>
      </View>
      <View style={styles.searchBar}>
        <Text
          style={styles.input}
          onPress={() => navigation.navigate("Search")}
        >
          Search Premise Name
        </Text>
        <MaterialIcons
          style={globalStyles.icon}
          name="search"
          size={20}
          onPress={() => navigation.navigate("Search")}
        />
      </View>
      <View style={styles.queueView}>
        <Text style={styles.queueTitle}>Your Queue</Text>
        <Text style={styles.queueStatusTitle}>
          Status:
          {state.queueStatus ? (
            <Text style={styles.queueStatusText}>In Queue</Text>
          ) : (
            <Text style={styles.queueStatusText}>Not In Queue</Text>
          )}
        </Text>
        {state.queueStatus && (
          <View style={styles.queueWindow}>
            <View style={styles.queueWindowLeft}>
              <Text style={styles.premiseName}>
                {state.currentQueue.premiseName}
              </Text>
              <Text style={styles.position}>
                Position:
                <Text style={styles.queueStatusText}>
                  {state.currentQueue.pos}
                </Text>
              </Text>
            </View>
            <View style={styles.queueWindowRight}>
              <Button
                title="View"
                onPress={() => navigation.navigate("Queue")}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    backgroundColor: "#95CEFF",
    paddingBottom: 20,
  },
  welcomeText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
    padding: 20,
    fontSize: 16,
  },
  usernameText: {
    color: "white",
    fontWeight: "bold",
    padding: 20,
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  searchBar: {
    marginTop: -20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#C4C4C4",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  queueView: {
    marginHorizontal: 20,
    padding: 20,
  },
  queueTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  queueStatusTitle: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
  queueStatusText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
  },
  queueWindow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#95CEFF",
    borderRadius: 20,
  },
  queueWindowLeft: {
    flex: 6,
    backgroundColor: "#95CEFF",
    borderRadius: 20,
  },
  queueWindowRight: {
    flex: 4,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#FFF",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  premiseName: {
    fontSize: 16,
    paddingVertical: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  position: {
    fontSize: 16,
    paddingVertical: 20,
    marginVertical: 10,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  input: {
    padding: 10,
    flex: 9,
    color: "#C4C4C4",
  },
});
