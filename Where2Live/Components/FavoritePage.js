import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Linking,
  ScrollView
} from "react-native";
import styles from "./StyleSheet.js";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";

const { height } = Dimensions.get("window");
export default class FavoritePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: null,
      place: null,
      checkedB: true,
      screenHeight: 0
    };
  }
  componentDidMount() {
    console.log("idddd" + id);
    this.GetPlaces();
  }
  GetPlaces = () => {
    console.log("iddddd" + id);
    const data = {
      userid: id
    };
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebServise.asmx/GetPlacesFromFavorite",
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
          let places = JSON.parse(result.d);
          if (places == null) {
            this.setState({
              message: "הרשמה נכשלה"
            });
            return;
          } else {
            console.log("U = " + places);
            this.setState({
              places: places
            });
          }
          console.log(result.d);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  _pressCall = () => {
    const url = "tel:" + this.state.place.Phone;
    Linking.openURL(url);
  };
  render() {
    const scrollEnabled = this.state.screenHeight > height;

    let Houses = [];

    if (this.state.places != null) {
      debugger;
      Houses = this.state.places.map((place, index) => {
        // if (index == this.state.pageToShow) {
        //   this.viewPage = place.Address;
        // }
        return (
          <View
            style={{
              width: "100%",
              height: "18%",
              resizeMode: "cover",
              marginBottom: 10
            }}
            key={index}
          >
            <ImageBackground
              source={require("../assets/BackGround.jpg")}
              style={styles.card}
            >
              <View style={{ flexDirection: "row-reverse" }}>
                <View>
                  <Image
                    source={require("../assets/background1.jpg")}
                    style={{ width: 130, height: 100 }}
                    resizeMode="cover"
                  />
                </View>

                <View style={{ flex: 2 }} />
                <View>
                  <Text style={{ fontSize: 18, fontWeight: "bold", flex: 2 }}>
                    {place.Address}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold", flex: 2 }}>
                    שם המקום:{place.Name}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  מידע על האירוע : {place.About}{" "}
                </Text>
              </View>

              <View style={{ flexDirection: "row-reverse", bottom: 5 }}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 2, marginTop: 10 }}>
                  {this.state.showNumber != true ? (
                    <TouchableOpacity
                      onPress={this._pressCall}
                      success
                      type="outline"
                    >
                      <Icon name="phone" color="green" size={40} />
                    </TouchableOpacity>
                  ) : (
                    <Text
                      style={{ color: "blue", fontSize: 18, marginLeft: 30 }}
                    >
                      0526666666
                    </Text>
                  )}
                </View>
                <View>
                  <CheckBox
                    title=" מועדפים"
                    style={{ position: "absolute", flex: 3 }}
                    iconRight
                    iconType="material"
                    checkedIcon="star"
                    uncheckedIcon="star"
                    checkedColor="yellow"
                    checked={this.state.checkedB}
                    onPress={() =>
                      this.setState({ checkedB: !this.state.checkedB })
                    }
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        );
      });
    }
    console.log("Houses = ", Houses);

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
            <ScrollView
              contentContainerStyle={styles.scrollview}
              scrollEnabled={scrollEnabled}
              onContentSizeChange={this.onContentSizeChange}
            >
              {Houses}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
