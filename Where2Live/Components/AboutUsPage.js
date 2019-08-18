import React from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import styles from "./StyleSheet";
import { Icon } from "react-native-elements";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

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
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    fontSize: 12,
                    flex: 1
                  }}
                >
                  אפליקציה זאת מאפשרת למשתמשים בה לפרסם ולחפש דירה למכירה או
                  להשכרה.
                  {"\n"}
                  {"\n"}
                  באמצעות ממשק נוח ופשוט ניתן לפרסם ולחפש דירה על גבי מפה ובכך
                  לחפש לפי מיקום אידאלי.
                </Text>
              </View>
              <View style={{ borderBottomWidth: 1, marginTop: 30 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold"
                  }}
                >
                  פיתוח ועיצוב
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    flex: 1
                  }}
                >
                  תומר לרנר - Lerner1208@gmail.com
                  {"\n"}
                  {"\n"}
                  רון בוחניק - ronb199447@gmail.com
                </Text>
              </View>
              <Icon
                name="thumbs-up"
                type="font-awesome"
                color="black"
                size={80}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
