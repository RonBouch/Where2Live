import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import styles from "./StyleSheet";
import { Icon } from "react-native-elements";
import { ImagePicker } from "expo";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
    this.profileImage = require("../assets/profileIcon.png");
  }
  openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      console.log("result ", result);
      this.setState({ img: result.uri });
    }
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

              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderRadius: 100,
                  borderColor: "black",
                  height: 100,
                  width: 100
                }}
                onPress={this.openGallery}
              >
                {this.state.img != "" ? (
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 100
                    }}
                    source={{ uri: this.state.img }}
                  />
                ) : (
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 100
                    }}
                    source={this.profileImage}
                  />
                )}
              </TouchableOpacity>
              <Text style={{ marginTop: 30, fontWeight: "bold", fontSize: 24 }}>
                ברוך הבא, {global.firstName} {global.lastName}
              </Text>

              <TouchableOpacity
                style={styles.registerButton2}
                onPress={() => this.props.navigation.navigate("EditPage")}
              >
                <Text style={styles.register}>
                  עידכון פרטים
                  {"  "}
                </Text>
                <Icon name="edit" type="font-awesome" color="black" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
