import React, { Component } from 'react'
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
  import styles from "./SearchPageStyle";


export default class FavoritePage extends Component {
    constructor(props) {
        super(props);
            this.state={
                places:null,
                place:null,
                checkedB:true,
            }
    }
    componentDidMount(){
        this.GetPlaces();
    }
    GetPlaces(){
        GetPlaces = () => {
            console.log("iddddd"+id);
            const data = {
                userid:id
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
        
    }
    _pressCall=()=>{
        const url='tel:'+this.state.place.Phone
        Linking.openURL(url)
      }
    render() {
        let Houses = [];

    if (this.state.places != null) {
      debugger;
      Houses = this.state.places.map((place, index) => {
        // if (index == this.state.pageToShow) {
        //   this.viewPage = place.Address;
        // }
        return (
          <View style={styles.card}>
           
           <ImageBackground
                  source={require("../assets/background1.jpg")}
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
                          source={{
                            uri:
                              "http://ruppinmobile.tempdomain.co.il/site11/image/"+this.state.place.Img
                          }}
                          style={{ width: 130, height: 100 }}
                          resizeMode="cover"
                        />
                      </View>

                      <View style={{ flex: 2 }} />
                      <View>
                        <Text
                          style={{ fontSize: 18, fontWeight: "bold", flex: 2 }}
                        >
                          {this.state.place.Address}
                        </Text>
                        <Text
                          style={{ fontSize: 16, fontWeight: "bold", flex: 2 }}
                        >
                          שם המקום:{this.state.place.Name}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                        מידע על האירוע : {this.state.place.About}{" "}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row-reverse", bottom:5 }}>
                      <View style={{ flex: 1 }} />
                      <View style={{ flex: 2, marginTop: 10 }}>
                      {this.state.showNumber!=true?  <TouchableOpacity
                          onPress={this._pressCall}
                          success
                          type="outline"
                        >
                          <Icon name="phone" color="green" size={40} />
                        </TouchableOpacity>:<Text style={{color:'blue',fontSize:18,marginLeft:30}}>0526666666</Text>}
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
                  </View>
                </ImageBackground>
          </View>

          //       index==this.state.pageToShow?
          //   <View style={styles.card} key={index}>
          //             <View style={{height:'35%'}}>
          //             <Image
          //               source={require('../assets/party1.jpg')}
          //               style={styles.cardImage}
          //               resizeMode="cover"
          //             />
          //             </View>
          //             <View  style={{}}>
          //             <CheckBox
          //         center
          // title=' מועדפים'
          // iconRight
          // iconType='material'
          // checkedIcon='done'
          // uncheckedIcon='add'
          // checkedColor='yellow'
          // checked={this.state.checkedB}
          // onPress={() => this.setState({checkedB: !this.state.checkedB})}/>

          //             </View>
          //             <View style={{}}>
          //               <Text>
          //               {place.Address}'\n'
          //                  מס 0523665524
          //                 פתוח 24//7
          //                 </Text>
          //             </View>
          //           </View>
        );
      });
    }

        return (
            <View style={{alignItems:'center'}}>
                <Text>Hi aLL</Text>
                {Houses}
            </View>
        )
    }
}
