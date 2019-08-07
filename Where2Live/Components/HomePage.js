import React, { Component } from "react";
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
        source={require("../assets/Street.jpg")}
        style={styles.container}
      >
        <View style={{ padding: 20 }}>
          <Image
            source={require("../assets/Where2LiveLogo.png")}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        {/* <View style={{alignItems:"center",textAlign:'center',position:'absolute',height:'100%',width:'100%'}}>
        <Image source={require('../assets/smalllogo.png')}style={{}}/>

        </View> */}
        <View style={styles.inner}>
          <View style={styles.formContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate("SearchPage")}
            >
              <Image
                style={styles.icon}
                source={require("../assets/Search.jpg")}

              />
              <Text style={styles.info}> חיפוש</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate("PublishPage")}
            >
              <Image
                style={styles.icon}
                source={require("../assets/publish.jpg")}

              />
              <Text style={styles.info}>פרסום אירוע</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}>
              <Image
                style={styles.icon}
                source={require("../assets/5.jpg")}

              />
              <Text style={styles.info}>הפרופיל שלי</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AboutUsPage")}
              style={styles.buttonContainer}
            >
              <Image
                style={styles.icon}
                source={require("../assets/About.jpg")}

              />
              <Text style={styles.info}>About Us</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
           onPress={() => this.props.navigation.navigate("FavoritePage")}
            style={styles.buttonContainer}>
              <Image
                style={styles.icon}
                source={require("../assets/Favorite.jpg")}
              />
              <Text style={styles.info}>המועדפים שלי</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.logOut}
            >
              <Image
                style={styles.icon}
                source={require("../assets/Delete.jpg")}
              />
              <Text style={styles.info}>התנתק</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40
  },
  cardImage: {
    width: 255,
    height: 140
  },
  inner: {
    width: "80%",
    height: "100%"
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 200
  },
  title: {
    fontSize: 40,
    margin: 30
  },
  input: {
    borderRadius: 10,
    fontSize: 10,
    height: 40,
    width: 200,
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 2,
    margin: 30
  },
  textMessage: {
    margin: 50,
    color: "red"
  },
  registerBtn: {
    color: "red"
  },
  genderRadio: {
    flexDirection: "row",
    margin: 10
  },
  textMessage: {
    margin: 10,
    color: "red"
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 200,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    margin: 10,
    marginTop: 10
  },
  formContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 150
  },
  buttonContainerFB: {
    backgroundColor: "#2980b9",
    paddingVertical: 10,
    width: 240,
    height: 45,
    borderRadius: 200,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 30
  },
  info: {
    fontWeight: "bold"
  }
});
