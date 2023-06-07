import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import globalStyles from "../shared/header";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.UI.errors) {
      return { errors: nextProps.UI.errors }; // <- this is setState equivalent
    }
    return null;
  }

  pressHandler = () => {
    this.props.navigation.navigate("Register");
  };
  handleLogin = () => {
    this.setState({ loading: true });
    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(loginData, this.props.navigation);
  };
  render() {
    const { errors } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={globalStyles.logo}
            source={require("../assets/REBOT2.png")}
          />
        </View>
        <View style={styles.loginForm}>
          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
          />
          <Text>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
          />
          <TouchableOpacity
            style={styles.loginbutton}
            onPress={this.handleLogin}
          >
            <Text style={styles.white}> LOGIN </Text>
          </TouchableOpacity>
          {errors.general && (
            <Text style={styles.error_message}>{errors.general}</Text>
          )}
          <View style={styles.signuplabel}>
            <Text>
              New to ReBOT?
              <Text style={styles.green} onPress={this.pressHandler}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  loginUser,
};
export default connect(mapStateToProps, mapActionToProps)(Login);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  header: {
    marginTop: 24,
    paddingBottom: 24,
    height: "40%",
    backgroundColor: "#2699FB",
    alignContent: "center",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  loginForm: {
    padding: 24,
  },
  input: {
    marginVertical: 10,
    padding: 15,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },
  loginbutton: {
    borderRadius: 30,
    overflow: "hidden",
    marginVertical: 20,
    backgroundColor: "#365A0C",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
  },
  white: {
    color: "white",
    fontWeight: "bold",
  },
  signuplabel: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  green: {
    color: "#365A0C",
  },
  error_message: {
    color: "red",
    justifyContent: "center",
  },
});
