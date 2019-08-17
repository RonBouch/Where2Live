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
      screenHeight: 0,
      placePhone: "",
      pageToShow: null
    };
  }
  componentDidMount() {
    this.GetPlaces();
  }

  GetPlaces = () => {
    // console.log("iddddd"+id);
    const data = {
      userid: 28
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
  _pressCall = p => {
    this.setState({
      placePhone: p
    });
    const url = "tel:" + p.Phone;
    Linking.openURL(url);
  };
  infoWindow = (p, i) => {
    // console.log('page to show  -- -- - = = == '+ p.City+i)
    console.log("imgggg = " + p.Img);

    if (this.state.pageToShow == null || this.state.pageToShow != i) {
      this.setState({
        pageToShow: i,
        place: p
      });
    } else {
      this.setState({
        pageToShow: null,
        place: null
      });
    }
  };
  render() {
    const scrollEnabled = this.state.screenHeight > height - 800000;

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
              height: "25%",
              marginBottom: "2%",
              backgroundColor: "rgba(255,255,255,.4)"
            }}
            key={index}
          >
            <ImageBackground
              source={require("../assets/BG2.jpg")}
              style={styles.card}
            >
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ width: "75%", padding: "3%" }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {place.Address}
                  </Text>
                  <View style={{ flexDirection: "row-reverse" }}>
                    {place.Floor != "" ? (
                      <Text style={styles.textCard}> קומה:{place.Floor}</Text>
                    ) : (
                      console.log(place.Floor)
                    )}
                    <Text style={styles.textCard}>חדרים:{place.Room}</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      marginTop: "5%",
                      flexDirection: "row-reverse",
                      justifyContent: "space-between"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this._pressCall(place.Phone)}
                      success
                      type="outline"
                      style={styles.phoneCard}
                    >
                      <Text style={styles.textCard}>התקשר</Text>
                      <Icon name="phone" color="green" size={24} />
                    </TouchableOpacity>

                    <Text
                      style={{
                        fontSize: 16,
                        flex: 3,
                        color: "red",
                        fontWeight: "bold",
                        marginRight: 17
                      }}
                    >
                      ₪ {place.Price}
                    </Text>
                  </View>
                </View>

                <View style={{ width: "25%" }}>
                  <Image
                    source={{
                      uri:
                        "http://ruppinmobile.tempdomain.co.il/site11/image/" +
                        place.Img
                    }}
                    style={{ width: "90%", height: "70%" }}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={styles.textCard}
                  onPress={() => {
                    this.infoWindow(place, index);
                  }}
                >
                  עוד..
                </Text>
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
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{ marginLeft: "85%" }}
              >
                <Icon
                  name="arrow-circle-left"
                  type="font-awesome"
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
            <View
              style={{
                borderTopColor: "black",
                borderTopWidth: 3,
                width: "100%",
                alignItems: "center",
                borderBottomColor: "black",
                borderBottomWidth: 3,
                backgroundColor: "rgba(255,255,255,.9)",
                shadowColor: "#000"
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                מועדפים
              </Text>
            </View>
            <ScrollView
              style={{ marginBottom: "3%", marginTop: "2%" }}
              contentContainerStyle={styles.scrollview}
              scrollEnabled={scrollEnabled}
              onContentSizeChange={this.onContentSizeChange}
            >
              {Houses}
              
            </ScrollView>

            {this.state.pageToShow != null ? (
              <ImageBackground
                source={require("../assets/BG2.jpg")}
                style={{
                  width: "100%",
                  height: "75%"
                }}
              >
                <View
                  style={{
                    borderColor: "black",
                    borderWidth: 2,
                    height: "75%"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ pageToShow: null })}
                  >
                    <Icon
                      name="times-circle"
                      type="font-awesome"
                      iconStyle={{}}
                      color="black"
                      size={34}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      alignItems: "center",
                      width: "100%",
                      height: "20%",
                      marginBottom: 5
                    }}
                  >
                    <Image
                      source={require("../assets/H1.jpg")}
                      style={{ width: "40%", height: "100%" }}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopColor: "black",
                      borderTopWidth: 3,
                      flexDirection: "row",
                      backgroundColor: "rgba(255,255,255,.9)"
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {this.state.place.Address} /{" "}
                    </Text>

                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {this.state.place.RB}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderTopColor: "black",
                      borderTopWidth: 3
                    }}
                  >
                    <Text style={styles.textCard2}>
                      איש קשר : {this.state.place.Name}
                    </Text>
                    <Text style={styles.textCard2}>
                      מ'ס טלפון : {this.state.place.Phone}
                    </Text>
                    <Text style={styles.textCard2}>
                      סוג הנכס: {this.state.place.Type}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <Text style={styles.textCard2}>
                      מ"ר:{this.state.place.SquareMeter}
                    </Text>
                    <Text style={styles.textCard2}>
                      קומה:{this.state.place.Floor}
                    </Text>

                    <Text style={styles.textCard2}>
                      חדרים:{this.state.place.Room}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text style={styles.textCard2}>
                      על הנכס: {this.state.place.About}
                    </Text>
                  </View>
                  <View />
                  <View>
                    <Text
                      style={{ fontSize: 20, color: "red", fontWeight: "bold" }}
                    >
                      מחיר: ₪{this.state.place.Price}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            ) : (
              console.log("mjcjcjc")
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
}
