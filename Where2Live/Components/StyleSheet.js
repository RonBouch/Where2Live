import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //Basic Design

  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  logo: {
    marginTop: "15%",
    width: "90%",
    height: "30%"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "10%",
    paddingRight: "10%"
  },
  main: {
    backgroundColor: "rgba(255,255,255,.6)",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },

  //Login Page Style

  loginForm: {
    alignItems: "center",
    width: "100%"
  },
  input: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 50,
    width: 250,
    height: 40,
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 2,
    margin: 5
  },
  loginButton: {
    backgroundColor: "rgba(100,100,100,.5)",
    borderRadius: 200,
    height: 30,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 2,
    marginRight: "55%",
    marginTop: 5
  },
  textMessage: {
    margin: 10,
    color: "red"
  },
  registerButton: {
    backgroundColor: "rgba(255,255,0,.9)",
    flexDirection: "row",
    height: 45,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderColor: "white",
    borderWidth: 2
  },

  faceBookButton: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,255,.9)",
    height: 45,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderColor: "white",
    borderWidth: 2
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "red",
    height: 45,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderColor: "white",
    borderWidth: 2
  },
  buttonText: {
    color: "white"
  },

  //Login Page Style

  genderRadio: {
    backgroundColor: "rgba(255,255,255,.5)",
    flexDirection: "row",
    margin: 10,
    justifyContent: "center"
  },
  registerButton2: {
    backgroundColor: "rgba(255,255,0,.9)",
    flexDirection: "row",
    height: 45,
    width: 200,
    marginTop:10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2
  }
});
