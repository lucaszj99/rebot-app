import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { leaveQueue } from "../redux/actions/queueAction";
import { getUserData } from "../redux/actions/userAction";
export default function Queue({ navigation }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLeaveQueue = () => {
    const queueData = {
      premiseId: user.currentQueue.premiseId,
      pos: user.currentQueue.pos,
    };
    dispatch(leaveQueue(queueData));
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <View style={styles.queueView}>
        <Text style={styles.queueTitle}>Your Queue</Text>
        <Text style={styles.queueStatusTitle}>
          Status:
          {user.queueStatus ? (
            <Text style={styles.queueStatusText}>In Queue</Text>
          ) : (
            <Text style={styles.queueStatusText}>Not In Queue</Text>
          )}
        </Text>
        {user.queueStatus && (
          <View style={styles.queueWindow}>
            <View>
              <Text style={styles.label}>Premise:</Text>
              <Text style={styles.premiseName}>
                {user.currentQueue.premiseName}
              </Text>
              <Text style={styles.label}>
                Position:
                <Text style={styles.queueStatusText}>
                  {user.currentQueue.pos}
                </Text>
              </Text>
              <Text style={styles.label}>Enter Queue Time:</Text>
              <Text style={styles.premiseName}>
                {user.currentQueue.enteredAt}
              </Text>
            </View>
            <View>
              <Button title="Leave Queue" onPress={() => handleLeaveQueue()} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
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
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#95CEFF",
    borderRadius: 20,
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    marginVertical: 10,
  },
});
