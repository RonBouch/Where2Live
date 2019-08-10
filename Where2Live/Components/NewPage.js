import React from "react";
import { View, ImageBackground, Image, TouchableOpacity } from "react-native";
import styles from "./StyleSheet";
import { Icon } from "react-native-elements";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/background2.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.logo}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="arrow-circle-left"
                  type="font-awesome"
                  iconStyle={{ marginLeft: "85%" }}
                  color="black"
                  size={34}
                />
              </TouchableOpacity>
              <Image
                source={require("../assets/houseLogo.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
