import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { checkOutPremiseManual } from "../redux/actions/recordAction";
import { withOrientation } from "react-navigation";
export default function Result({ navigation }) {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.results.results);
  const loading = useSelector((state) => state.results.loading);
  const error = useSelector((state) => state.UI.errors);
  useEffect(() => {
    if (error != null && error.error === "Premise is Occupied") {
      Alert.alert(
        "Failed",
        "Premise Is Currently Occupied, Do you wish to Queue?",
        [
          {
            text: "Yes",
            onPress: () => console.log("Ask me later pressed"),
          },
          {
            text: "No",
            onPress: () => navigation.navigate("Home"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  }, []);
  return loading !== true ? (
    result.data ? (
      <View style={styles.container}>
        <View style={styles.resultHeader}>
          <Text style={styles.titleText}>Check In Information</Text>
        </View>
        {error != null &&
          error.error === "Premise is Occupied" &&
          Alert.alert(
            "Failed",
            "Premise Is Currently Occupied, Do you wish to Queue?",
            [
              {
                text: "Yes",
                onPress: () => console.log("Ask me later pressed"),
              },
              {
                text: "No",
                onPress: () => navigation.navigate("Home"),
                style: "cancel",
              },
            ],
            { cancelable: false }
          )}
        <View style={styles.result}>
          <Text style={styles.statusLabel}>Location</Text>
          <Text style={styles.statusText}>{result.data.premiseName}</Text>
          <Text style={styles.statusLabel}>Username</Text>
          <Text style={styles.statusText}>{result.data.checkInUser}</Text>
          <Text style={styles.statusLabel}>Contact</Text>
          <Text style={styles.statusText}>{result.data.contact}</Text>
          <Text style={styles.statusLabel}>Date & Time</Text>
          <Text style={styles.statusText}>{result.data.enteredAt}</Text>
        </View>
        <View style={styles.resultFooter}>
          <Text style={styles.resultTitle}>{result.message}</Text>
          <AntDesign style={styles.icon} name="checkcircle" size={20} />
        </View>
        <View style={styles.checkoutView}>
          <TouchableOpacity
            onPress={() => {
              dispatch(checkOutPremiseManual(result.data.premiseKey));
            }}
          >
            <Text>Check Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.resultHeader}>
          <Text style={styles.titleText}>Check Out</Text>
        </View>
        <View style={styles.checkout}>
          <Text style={styles.resultTitle}>{result.message}</Text>
          <AntDesign style={styles.icon} name="checkcircle" size={20} />
        </View>
        <View style={styles.checkoutView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text>Return to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  ) : (
    <View style={styles.resultHeader}>
      <Text>Loading</Text>
    </View>
  );
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  result: {
    backgroundColor: "#FFFF",
    padding: 25,
    width: "100%",
    flex: 0.4,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  checkoutView: {
    width: "100%",
    borderColor: "black",
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resultFooter: {
    backgroundColor: "#FFFF",
    width: "100%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 50,
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -25,
    paddingHorizontal: 25,
    paddingHorizontal: 25,
  },
  resultHeader: {
    backgroundColor: "#95CEFF",
    padding: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#365A0C",
    width: "80%",
    flexWrap: "wrap",
    fontWeight: "bold",
  },
  titleText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    width: "80%",
    flexWrap: "wrap",
    fontWeight: "bold",
  },
  icon: {
    color: "#365A0C",
  },
  statusText: { color: "black", fontSize: 15, marginTop: 5 },
  statusLabel: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
    marginTop: 5,
  },
  checkout: {
    width: "100%",
    borderColor: "black",
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFF",
  },
});
