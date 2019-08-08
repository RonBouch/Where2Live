import React from "react";
import styles from "./StyleSheet";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";

import { Icon } from "react-native-elements";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AuthSession } from "expo";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.password = "";
    this.email = "";
    this.vaildForm = false;
    (global.id = 0),
      (this.state = {
        message: ""
      });
  }

  changePass = e => {
    this.password = e;
  };

  changeEmail = e => {
    this.email = e;
  };

  validation = () => {
    if (this.email == "") {
      this.setState({ message: "* אנא הכנס כתובת אימייל" });
    } else if (this.password == "") {
      this.setState({ message: "* אנא הכנס סיסמא" });
    } else {
      this.vaildForm = true;
      this.login();
    }
  };

  login = () => {
    if (this.vaildForm) {
      const data = {
        password: this.password,
        email: this.email
      };
      console.log(data);
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11//WebServise.asmx/Login",
        {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/Json;"
          }),
          body: JSON.stringify(data)
        }
      )
        .then(res => {
          console.log("res=", res);
          return res.json();
        })
        .then(
          result => {
            console.log("fetch POST= ", result);
            let u = JSON.parse(result.d);
            console.log("u = " + u);
            if (u == null) {
              console.log("ASffasasf");
              this.setState({
                message: "התחברות נכשלה"
              });
              return;
            } else {
              global.id = u.ID;
              console.log("user id = " + global.id);
              this.props.navigation.navigate("HomePage");
            }
            console.log(result.d);
            console.log(result);
          },
          error => {
            console.log("err post=", error);
          }
        );
    }
  };

  RegisterBtn = () => {
    this.props.navigation.navigate("RegisterPage");
  };

  // FaceBookBtn = () => {
  //   this.props.navigation.navigate("FaceBookPage");
  // };

  // GoogleBtn = () => {
  //   this.props.navigation.navigate("GooglePage");
  // };

  render() {
    return (
      <ImageBackground
        source={require("../assets/background2.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.logo}>
              <Image
                source={require("../assets/houseLogo.png")}
                style={{ width: "100%", height: "100%", marginTop: "15%" }}
                resizeMode="contain"
              />
            </View>
            <View style={styles.loginForm}>
              <View style={styles.input}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="envelope"
                  type="font-awesome"
                  color="gray"
                  size={28}
                />
                <TextInput
                  keyboardType="email-address"
                  placeholder="אימייל"
                  onChangeText={this.changeEmail}
                />
              </View>
              <View style={styles.input}>
                <Icon
                  iconStyle={{ marginEnd: "10%" }}
                  name="lock"
                  type="font-awesome"
                  color="gray"
                  size={35}
                />
                <TextInput
                  secureTextEntry={true}
                  placeholder="סיסמא"
                  onChangeText={this.changePass}
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.validation}
              >
                <Text>התחבר</Text>
              </TouchableOpacity>

              <Text style={styles.textMessage}>{this.state.message}</Text>
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={this.RegisterBtn}
            >
              <Text>
                הרשמה
                {"  "}
              </Text>
              <Icon
                name="user-plus"
                type="font-awesome"
                color="black"
                size={18}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("GooglePage")}
              style={styles.googleButton}
            >
              <Text style={styles.buttonText}>
                {"  "}
                Google
              </Text>
              <Icon
                name="logo-googleplus"
                type="ionicon"
                color="white"
                size={24}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.FaceBookBtn}
              style={styles.faceBookButton}
            >
              <Text style={styles.buttonText}>
                {"  "}
                FaceBook
              </Text>
              <Icon
                name="facebook-square"
                type="font-awesome"
                color="white"
                size={18}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
