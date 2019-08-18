import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginPage from "./Components/LoginPage.js";
import RegisterPage from "./Components/RegisterPage.js";
import HomePage from "./Components/HomePage.js";
import SearchPage from "./Components/SearchPage.js";
import PublishPage from "./Components/PublishPage";
import FaceBookPage from "./Components/FaceBookPage";
import AboutUsPage from "./Components/AboutUsPage";
import GooglePage from "./Components/GooglePage";
import NewPage from "./Components/NewPage";
import FavoritePage from "./Components/FavoritePage";
import PushNotPage from "./Components/PushNotPage";
import MyProfilePage from "./Components/MyProfilePage";
import EditPage from "./Components/EditPage";

import registerForPushNotificationsAsync from "./Components/registerForPushNotificationsAsync";

class App extends React.Component {
  render() {
    return <StackNav />;
  }
}

const StackNav = createStackNavigator(
  {
    LoginPage: LoginPage,

    SearchPage: SearchPage,

    HomePage: HomePage,

    RegisterPage: RegisterPage,

    FavoritePage: FavoritePage,

    AboutUsPage: AboutUsPage,

    MyProfilePage: MyProfilePage,

    EditPage: EditPage,

    PublishPage: PublishPage,

    PushNotPage: PushNotPage,

    registerForPushNotificationsAsync: registerForPushNotificationsAsync,

    NewPage: NewPage,

    FaceBookPage: FaceBookPage,

    GooglePage: GooglePage
  },
  { headerMode: "none", defaultNavigationOptions: { headerVisable: false } },
  {
    initialRouteName: "LoginPage"
  }
);

export default createAppContainer(StackNav);
