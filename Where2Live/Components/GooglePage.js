import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import * as Expo from "expo"
//import Expo from "expo"

const WSURL ="http://ruppinmobile.tempdomain.co.il/site11//WebServise.asmx/Register";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      FirstName: "",
      lastname:"",
      photoUrl: "",
      Email: "",
      password:"",
      gender:"",
      birthday:null,
    }
  }
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
        "135412253455-6ep88ehld8lcfch6g6ik6llgk326m3fj.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })
console.log("SADdddddddddddddddddddddddddddddddddddddddddddddddddddddasdssda")
      if (result.type === "success") {
        this.setState({
          signedIn: true,
          FirstName: result.user.givenName,
          lastname:result.user.familyName,
          photoUrl: result.user.photoUrl,
          Email: result.user.email,
      
          
        })
      
        console.log(this.state.FirstName+" ln= " +this.state.lastname+"email=:"+this.state.Email)
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
    const data={
      firstName: this.state.FirstName,
      lastName:this.state.lastname,
      email: this.state.Email,
      password:"Google",
      gender:"Google",
      birthday:"1900-01-01"
    };
    console.log('dataaaaw',data)
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebServise.asmx/RegisterWithGoogle",
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
          let u = JSON.parse(result.d);
          console.log("result d ="+result.d);
          if (u == null) {
            console.log("allready exist!!!!!!!!!!!!!!1");
            this.props.navigation.navigate('HomePage');

            return;
          } else {
            console.log("U = " + u);
            id = u.ID;
            this.props.navigation.navigate('HomePage');
          }
          console.log(result.d);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };
      


  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage FirstName={this.state.FirstName} photoUrl={this.state.photoUrl} Email={this.state.Email} />
        ) : (
          <LoginPage signIn={this.signIn} />
      
        )}
        <Button title="Go to app" onPress={() => this.props.navigation.navigate('HomePage')}/>
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.FirstName} email:{props.Email}</Text>

      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25,
    paddingTop: 30,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})