import React from "react";
import {
  View,
  ImageBackground,
  Image
} from "react-native";
import styles from "./StyleSheet";
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
            <Image
              source={require("../assets/houseLogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
