import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../styles/global";
import { connect, useDispatch } from "react-redux";
import { getPremiseDetail } from "../redux/actions/premiseAction";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { registerQueue } from "../redux/actions/queueAction";
import { clearError, getUserData } from "../redux/actions/userAction";

class PremiseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      premiseName: "",
      dialogVisible: false,
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.handleQueue = this.handleQueue.bind(this);
    this.handleFailed = this.handleFailed.bind(this);
  }
  toggleDialog() {
    this.setState({ dialogVisible: !this.state.dialogVisible });
  }
  handleQueue(premiseId) {
    this.props.registerQueue(premiseId);
    this.setState({ dialogVisible: !this.state.dialogVisible });
    this.props.navigation.navigate("Home");
  }
  handleFailed() {
    this.props.clearError();
    this.props.navigation.navigate("Home");
  }
  render() {
    const { premise, UI } = this.props;
    return premise.loading !== true ? (
      <View style={styles.container}>
        <Text style={globalStyles.title}>{premise.premise.premiseName}</Text>
        <Image
          style={styles.premisePic}
          source={{
            uri: premise.premise.imageUrl,
          }}
        />
        <ScrollView style={styles.content}>
          <Text style={styles.label}>Premise Description</Text>
          <Text style={styles.detail}>{premise.premise.description}</Text>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.detail}>
            {premise.premise.address},{premise.premise.postcode},
            {premise.premise.city},{premise.premise.state}
          </Text>
          <Text style={styles.label}>Operation Hours</Text>
          <Text style={styles.detail}>
            {premise.premise.operationStart}AM - {premise.premise.operationEnd}
            PM
          </Text>
          <View style={styles.rebotstatus}>
            <View style={styles.rebotoccupancy}>
              <Text style={styles.label}>Occupancy</Text>
              <Text style={styles.detail}>
                {premise.premise.currentOccupancy}/
                {premise.premise.occupancyLimit}
              </Text>
            </View>
            <View style={styles.rebotqueue}>
              <Text style={styles.detail}>Queue</Text>
              <Text style={styles.detail}>{premise.premise.queueCount}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.premiseButton}>
          <TouchableOpacity
            style={styles.editbutton}
            onPress={() => {
              this.props.navigation.navigate("Scan");
            }}
          >
            <Text style={globalStyles.white_text}>CHECK IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editbutton}
            onPress={() => {
              this.toggleDialog();
            }}
          >
            <Text style={globalStyles.white_text}>REGISTER TO QUEUE</Text>
          </TouchableOpacity>
        </View>
        {this.props.UI.errors != null &&
          Alert.alert(
            "Failed",
            `${UI.errors.error}`,
            [
              {
                text: "OK",
                onPress: () => this.handleFailed(),
              },
            ],
            { cancelable: false }
          )}
        <ConfirmDialog
          title="Register To Queue"
          message={`Queue for ${premise.premise.premiseName}?`}
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({ dialogVisible: false })}
          positiveButton={{
            title: "YES",
            onPress: () => this.handleQueue(premise.premise.username),
          }}
          negativeButton={{
            title: "NO",
            onPress: () => this.setState({ dialogVisible: false }),
          }}
        />
      </View>
    ) : (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  premise: state.premise,
  UI: state.UI,
});

const mapActionToProps = {
  getPremiseDetail,
  registerQueue,
  clearError,
  getUserData,
};
export default connect(mapStateToProps, mapActionToProps)(PremiseInfo);
const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  content: {
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  rebotstatus: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rebotoccupancy: {
    padding: 2,
    marginRight: 50,
  },
  rebotqueue: {
    padding: 2,
  },
  premiseButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  premisePic: {
    height: "30%",
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    padding: 2,
  },
  detail: {
    padding: 10,
    paddingHorizontal: 20,
  },
  editbutton: {
    backgroundColor: "#129539",
    borderRadius: 25,
    padding: 10,
    overflow: "hidden",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
