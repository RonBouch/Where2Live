import React, { Component } from "react";
import { Icon } from "react-native-elements";

import styles from "./StyleSheet";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
export default class HomeMenuView extends React.Component {
  constructor(props) {
    super(props);
    let userId = this.props.navigation.state.params;
    console.log("userID= " + JSON.stringify(userId));
  }

  logOut = () => {
    global.id = 0;
    this.props.navigation.navigate("LoginPage");
  };

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
              <View style={styles.iconsContainer}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => this.props.navigation.navigate("SearchPage")}
                >
                  <Image
                    style={styles.icon}
                    source={require("../assets/houseSearch.png")}
                  />
                  <Text style={styles.textIcon}> חיפוש</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => this.props.navigation.navigate("PublishPage")}
                >
                  <Image
                    style={styles.icon}
                    source={require("../assets/housePublish.png")}
                  />
                  <Text style={styles.textIcon}>פרסום נכס</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() =>
                    this.props.navigation.navigate("MyProfilePage")
                  }
                >
                  <Image
                    style={styles.icon}
                    source={require("../assets/profile.png")}
                  />
                  <Text style={styles.textIcon}>הפרופיל שלי</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("AboutUsPage")}
                  style={styles.buttonContainer}
                >
                  <Image
                    style={styles.icon}
                    source={require("../assets/info.png")}
                  />
                  <Text style={styles.textIcon}>קצת עלינו</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("FavoritePage")}
                  style={styles.buttonContainer}
                >
                  <Image
                    style={styles.icon}
                    source={require("../assets/favourites.png")}
                  />
                  <Text style={styles.textIcon}>מועדפים</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.logOut}
                >
                  <Image
                    style={styles.icon}
                    source={require("../assets/logout.png")}
                  />
                  <Text style={styles.textIcon}>התנתק</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
