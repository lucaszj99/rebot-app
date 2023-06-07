import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useDispatch } from "react-redux";
import {
  checkInPremise,
  checkOutPremiseScan,
} from "../redux/actions/recordAction";

export default function Scan({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (String(data).startsWith("checkin")) {
      dispatch(checkInPremise(data, navigation));
    } else if (String(data).startsWith("checkout")) {
      dispatch(checkOutPremiseScan(data, navigation));
    } else {
      Alert.alert("Invalid QR Code", "This is not a ReBOT QR Code");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <Text style={styles.description}>Scan your QR code</Text>
        <Image
          style={styles.qr}
          source={{
            uri: "https://i.stack.imgur.com/VVqSa.png",
          }}
        />
        <Text onPress={() => navigation.goBack()} style={styles.cancel}>
          Cancel
        </Text>
      </BarCodeScanner>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
const { width } = Dimensions.get("window");
const qrSize = width * 0.7;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  qr: {
    marginTop: "20%",
    marginBottom: "20%",
    width: "100%",
    height: qrSize,
  },
  description: {
    fontSize: width * 0.05,
    marginTop: "10%",
    textAlign: "center",
    width: "100%",
    color: "white",
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: "center",
    width: "100%",
    color: "white",
  },
});
