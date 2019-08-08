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
            this.state={
                places:null,
                place:null,
                checkedB:true,
                screenHeight:0,
                placePhone:"",
                pageToShow:null,

            }
    }
    componentDidMount(){
        this.GetPlaces();
    }
     GetPlaces = () => {
            
            const data = {
                userid:1
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
        
          onContentSizeChange=(contentWidth,contentHeight)=>{
          this.setState({screenHeight:contentHeight})

          }
    _pressCall=(p)=>{
        this.setState({
            placePhone:p
        })
        const url='tel:'+p.Phone
        Linking.openURL(url)
      }
      infoWindow = (p, i) => {
        // console.log('page to show  -- -- - = = == '+ p.City+i)
    
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
    }
    render() {
        const scrollEnabled= this.state.screenHeight>height-100;

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
            style={{width:'100%',height:'18%',marginBottom:10,backgroundColor: "rgba(255,255,255,.4)"        }}
            key={index}
          >
          
          <ImageBackground
            source={require("../assets/BG2.jpg")}
             style={styles.card}>
      
                 
                    <View style={{ flexDirection: "row-reverse" ,flex:1}}>

                      <View style={{width:'75%', padding:'3%'}}>
                        <Text
                          style={{ fontSize: 18, fontWeight: "bold" }}
                        >
                          {place.Address}
                        </Text>
                       <View style={{flexDirection: "row-reverse"}}>
                     
                        {place.Floor!=""?<Text
                          style={styles.textCard}
                        > קומה:{place.Floor} 
                        </Text>:console.log(place.Floor)}
                        <Text    style={styles.textCard}>
                           חדרים:{place.Room}
                       </Text>
                       </View>
                       <View style={{width:'100%',marginTop:'5%', flexDirection: "row-reverse",justifyContent: 'space-between'}}>
                      
                       <TouchableOpacity
                          onPress={()=>this._pressCall(place.Phone)}
                          success
                          type="outline"
                          style={styles.phoneCard}
                        >
                          <Icon name="phone" color="green" size={30} />
                          <Text style={styles.textCard}>התקשר:</Text>

                        </TouchableOpacity>

                       
                      <Text    style={{fontSize:16,flex:3,color:'red',  fontWeight: "bold",marginRight:17}}>
                          ₪{place.Price}
                       </Text> 
                      </View>
                      </View>
                      
                      <View style={{width:'25%'}}>
                        <Image
                          source={require("../assets/Home.jpg")
                          }
                          style={{ width: '90%', height: '90%' }}
                          
                        />
                      </View>

                    </View>
                    <View ><Text style={styles.textCard}  onPress={() => {this.infoWindow(place, index); }}>עוד..</Text></View>

                  </ImageBackground>

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




 {this.state.pageToShow != null ? (

             
                <ImageBackground
                  source={require("../assets/BG2.jpg")}
                  style={{ width: "100%", height: "100%" }}
                >
                  
                  <View
                    style={{
                      backgroundColor: "rgba(255,255,255,.6)",height:'70%'
                    }}
                  >
                        <TouchableOpacity
                  onPress={()=>this.setState({pageToShow:null})}>
                  <Icon
                    name="times-circle"
                    type="font-awesome"
                    iconStyle={{}}
                    color="black"
                    size={34}
                  />
                  </TouchableOpacity>
            
                   <View style={{alignItems:'center',width: '100%', height: '15%'}}>
                   <Image
                          source={require("../assets/Home.jpg")
                          }
                          style={{ width: '30%', height: '100%' ,borderWidth:2}}
                          
                        />
                   </View>
                   <View style={{height:'80%',width:'100%',flexDirection:'row-reverse',borderTopColor: 'black',borderTopWidth: 3}}>
                      
                   
                       <Text style={styles.textCard}>
                       מ"ר:{this.state.place.SquareMeter}
                       </Text>   
                        <Text style={styles.textCard}>
                       קומה:{this.state.place.Floor}
                       </Text>

                       <Text style={styles.textCard}>
                       חדרים:{this.state.place.Room}
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
