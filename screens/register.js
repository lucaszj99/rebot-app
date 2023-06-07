import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userAction";

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      premiseName: "",
      contact: "",
      queueStatus: null,
      errors: {},
    };
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup = () => {
    const signupData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username,
      fullName: this.state.fullName,
      contact: this.state.contact,
    };
    this.props.signupUser(signupData, this.props.navigation);
  };
  render() {
    const { errors } = this.state;
    const {
      UI: { loading },
    } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.loginForm}>
          <Text>Username</Text>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={(username) => this.setState({ username })}
          />
          <Text>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
          />
          <Text>Comfirm Password</Text>
          <TextInput
            placeholder="Re-enter Password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
          />
          <Text>Full Name</Text>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            onChangeText={(fullName) => this.setState({ fullName })}
          />
          <Text>Contact</Text>
          <TextInput
            placeholder="Contact"
            style={styles.input}
            onChangeText={(contact) => this.setState({ contact })}
          />
          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
          />
          <TouchableOpacity
            style={styles.loginbutton}
            onPress={this.handleSignup}
          >
            <Text style={styles.white}> Sign Up </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  signupUser,
};
export default connect(mapStateToProps, mapActionToProps)(UserRegister);

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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  green: {
    color: "#365A0C",
  },
});
