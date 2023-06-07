import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user);
  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>Profile</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.detail}>{user.username}</Text>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.detail}>{user.fullName}</Text>
        <Text style={styles.label}>Contact</Text>
        <Text style={styles.detail}>{user.contact}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.detail}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  content: {
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    padding: 10,
  },
  detail: {
    padding: 10,
    paddingHorizontal: 20,
  },
  editbutton: {
    borderRadius: 25,
    overflow: "hidden",
    marginHorizontal: 50,
    marginVertical: 10,
  },
});
