import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { getVisitRecord } from "../redux/actions/recordAction";
export default function Record() {
  const [records, setRecord] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVisitRecord());
  }, []);
  const record = useSelector((state) => state.records.records);
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        data={record}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.record}>
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
              <Text>{item.enteredAt}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  record: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#CBCACA",
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
  },
});
