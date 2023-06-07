import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";
import { TextInput } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { getPremiseSearch } from "../redux/actions/resultAction";
import { getPremiseDetail } from "../redux/actions/premiseAction";
export default function Search({ navigation }) {
  const [results, setRecord] = useState([
    { userId: "", premiseName: "", createdAt: "" },
  ]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const searchData = {
      searchText: searchText,
    };
    dispatch(getPremiseSearch(searchData));
    console.log(results);
  }, [results]);

  const handleSearch = () => {
    searchText !== null ? searchText : "";
    const searchData = {
      searchText: searchText,
    };
    console.log(searchData);
    dispatch(getPremiseSearch(searchData));
  };

  const getPremiseData = (premiseId) => {
    const premiseData = { premiseId: premiseId };
    dispatch(getPremiseDetail(premiseData));
    navigation.navigate("Premise");
  };

  const result = useSelector((state) => state.results.results);
  return (
    <View style={styles.container}>
      <Animatable.View animation="slideInRight" duration={500}>
        <Animatable.View style={styles.searchBar} animation="fadeInLeft">
          <MaterialIcons style={globalStyles.icon} name="search" size={20} />
          <TextInput
            placeholder="Search Premise"
            style={styles.searchText}
            onChangeText={(searchText) => {
              setSearchText(searchText);
              handleSearch();
            }}
          />
        </Animatable.View>
      </Animatable.View>
      <FlatList
        style={{
          backgroundColor: "white",
        }}
        data={result}
        keyExtractor={(item) => {
          return item.userId;
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.results}
            onPress={() => getPremiseData(item.userId)}
          >
            <View>
              <MaterialIcons
                style={styles.icon}
                name="location-on"
                color="black"
                size={20}
              />
            </View>
            <View style={styles.recordDesc}>
              <Text style={styles.locationTitle} numberOfLines={1}>
                {item.premiseName}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  searchBar: {
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  searchText: {
    flex: 7,
    fontSize: 15,
  },
  results: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#CBCACA",
    alignItems: "center",
    marginTop: 24,
    padding: 20,
    fontSize: 24,
  },
  icon: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
  },
  recordDesc: {
    flexDirection: "column",
    width: "80%",
  },
  locationTitle: {
    fontWeight: "bold",
    alignItems: "center",
  },
});
