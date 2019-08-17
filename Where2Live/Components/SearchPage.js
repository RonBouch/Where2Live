import React from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import styles from "./StyleSheet";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Location, Permissions } from "expo";
import { ActionButton } from "react-native-material-ui";
import { MapView } from "expo";
import RadioForm from "react-native-simple-radio-button";

const { Marker } = MapView;
var radio_props = [
  {
    icon: <Ionicons name="ios-man" size={18} color="" />,
    label: "  השכרה  ",
    value: "R"
  },

  {
    icon: <Ionicons name="ios-woman" size={18} color="" />,
    label: "  קניה  ",
    value: "B"
  }
];
export default class PartyPage extends React.Component {
  constructor(props) {
    super(props);

    // let userId = this.props.navigation.state.params;
    // console.log('userID=',this.props.navigation.state.params.id)
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      delta: 0.1,
      address: "",
      location: null,
      apartments: null,
      apartmentsB: null,
      apartmentsR: null,
      show: false,
      pageToShow: null,
      showNumber: false,
      checkedB: false,
      place: null,
      rb: "RB"
    };
    this.viewPage = null;
    this.RB = "RB";
  }
  changeRB = e => {
    this.setState({
      rb: e
    });
    this.RB = e;
    this.Getapartments();
    console.log("RB =" + this.RB + this.state.rb);
  };
  componentDidMount() {
    this.btnLocation();
    this.Getapartments();
  }

  handleAddress = e => {
    this.setState({
      address: e
    });
  };

  handleSubmit = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    if (this.isValid()) {
      const { address } = this.state;
      var detials = address.split(",", 2);
      console.log("detials = " + detials);
      if (detials[1] !== "") {
        this.setState({
          delta: 0.01
        });
      } else {
        this.setState({
          delta: 0.2
        });
      }

      let geocode = await Location.geocodeAsync(address);
      console.log("geocode  = " + geocode[0].latitude);

      this.setState({
        latitude: geocode[0].latitude,
        longitude: geocode[0].longitude
      });
      console.log("latitdue  = " + this.state.latitude);
    } else {
      alert("Invalid city");
    }
  };
  isValid() {
    let valid = false;
    const { address } = this.state;
    if (address.length !== 0) {
      valid = true;
    }
    return valid;
  }

  btnLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const output =
          "latitude=" +
          position.coords.latitude +
          "\nlongitude=" +
          position.coords.longitude +
          "\naltitude=" +
          position.coords.altitude +
          "\nheading=" +
          position.coords.heading +
          "\nspeed=" +
          position.coords.speed;
        console.log(output);

        this.setState({
          latitude: position.coords.latitude, // +  Math.random()/1000,
          longitude: position.coords.longitude
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  Getapartments = () => {
    const data = {
      rb: this.RB
    };
    if (this.RB == "R" && this.state.apartmentsR != null) {
      this.setState({
        apartments: this.state.apartmentsR
      });
      return;
    } else if (this.RB == "B" && this.state.apartmentsB != null) {
      this.setState({
        apartments: this.state.apartmentsB
      });
      return;
    }

    console.log(
      "sddddddddddddddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebServise.asmx/GetPlacesHouses",
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
          let apartments = JSON.parse(result.d);
          if (apartments == null) {
            this.setState({
              message: "הרשמה נכשלה"
            });
            return;
          } else {
            console.log("U = " + apartments);
            if (this.RB == "R") {
              this.setState({
                apartmentsR: apartments,
                apartments: apartments
              });
            } else if (this.RB == "B") {
              this.setState({
                apartmentsB: apartments,
                apartments: apartments
              });
            } else {
              this.setState({
                apartments: apartments
              });
            }
          }
          console.log(result.d);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  infoWindow = (p, i) => {
    // console.log('page to show  -- -- - = = == '+ p.City+i)

    if (this.state.pageToShow == null || this.state.pageToShow != i) {
      this.setState({
        checkedB: false,
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
  _pressCall = () => {
    const url = "tel:" + this.state.place.EventPhone;
    Linking.openURL(url);
  };
  FavoriteChack() {
    this.setState({
      checkedB: !this.state.checkedB
    });
    this.Favorite();
  }
  Favorite = () => {
    if (!this.state.checkedB) {
      console.log(
        "place id = " + this.state.place.ID + " " + this.state.checkedB
      );

      const data = {
        userid: id,
        placeid: this.state.place.ID
      };
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebServise.asmx/InsertFavorite",
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
            let fav = JSON.parse(result.d);
            if (fav == -1) {
              this.setState({
                checkedB: true
              });

              console.log("Allready Exist this favorite");
              return;
            } else {
              console.log("U = " + fav);
              this.setState({
                checkedB: true
              });
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
  render() {
    let markers = [];

    if (this.state.apartments != null) {
      debugger;
      markers = this.state.apartments.map((place, index) => {
        if (index == this.state.pageToShow) {
          this.viewPage = place.Address;
        }
        return (
          <Marker
            coordinate={{
              latitude: parseFloat(place.Lati),
              longitude: parseFloat(place.Longi)
            }}
            onPress={() => {
              this.infoWindow(place, index);
            }}
            key={index}
          >
            {index == this.state.pageToShow ? (
              <Icon name="home" type="font-awesome" color="blue" size={30} />
            ) : (
              <Icon name="home" type="font-awesome" color="black" size={30} />
            )}
          </Marker>
        );
      });
    }

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

            <View style={styles.container}>
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={this.handleAddress}
                  value={this.state.Address}
                  placeholder="הכנס כתובת"
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <RadioForm
                    radio_props={radio_props}
                    initial={null}
                    style={styles.radioRentBuy}
                    onPress={this.changeRB}
                  />
                </View>
                <TouchableOpacity
                  style={styles.buttonContainerS}
                  onPress={this.handleSubmit}
                >
                  <Text style={{ fontSize: 15 }}> חפש </Text>
                  <Icon
                    name="home"
                    type="font-awesome"
                    color="black"
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.containerMap}>
              <View
                style={{
                  padding: 10
                }}
              >
                <MapView
                  style={{
                    flex: 1,
                    height: Dimensions.get("window").height,
                    width: Dimensions.get("window").width - 72
                  }}
                  region={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0321
                  }}
                >
                  {markers}
                  <Marker
                    coordinate={{
                      latitude: this.state.latitude,
                      longitude: this.state.longitude
                    }}
                    title="my place:)"
                    description="here i am"
                    color="blue"
                  />
                </MapView>
              </View>

              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: Dimensions.get("window").width - 85,
                  flexDirection: "row-reverse"
                }}
              >
                <ActionButton icon="place" onPress={this.btnLocation} />
              </View>

              {this.state.pageToShow != null ? (
                <View style={styles.cardInfo}>
                  <ImageBackground
                    source={require("../assets/Street.jpg")}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <View
                      style={{
                        backgroundColor: "rgba(255,255,255,.6)",
                        height: "100%"
                      }}
                    >
                      <View style={{ flexDirection: "row-reverse" }}>
                        <View>
                          <Image
                            source={require("../assets/Home.jpg")}
                            style={{ width: 80, height: 80 }}
                          />
                        </View>
                        <View style={{ flex: 2 }} />
                        <View>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                              marginBottom: "5%"
                            }}
                          >
                            {this.state.place.Address}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "bold"
                            }}
                          >
                            איש קשר: {this.state.place.Name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              color: "red"
                            }}
                          >
                            מחיר : {this.state.place.Price + "₪"}{" "}
                          </Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: "row-reverse", bottom: 0 }}>
                        <View style={{ flex: 1 }} />
                        <View style={{ flex: 2, marginTop: "3%" }}>
                          <TouchableOpacity
                            onPress={this._pressCall}
                            success
                            type="outline"
                          >
                            <Icon name="phone" color="green" size={40} />
                          </TouchableOpacity>
                        </View>
                        <View>
                          <CheckBox
                            title=" מועדפים"
                            style={{ flex: 3 }}
                            iconRight
                            iconType="material"
                            checkedIcon="star"
                            uncheckedIcon="star"
                            checkedColor="yellow"
                            checked={this.state.checkedB}
                            onPress={() => this.FavoriteChack()}
                          />
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              ) : (
                console.log("mjcjcjc")
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
