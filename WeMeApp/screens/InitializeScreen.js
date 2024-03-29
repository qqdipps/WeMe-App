import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import { weMeSocket } from "../functions/weMeSocket";

class InitializeScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {};

  componentDidMount = () => {
    const {
      socket,
      setSocket,
      schema
    } = this.props.navigation.getScreenProps();
    !socket && weMeSocket(setSocket);
    Realm.open({
      schema: schema,
      deleteRealmIfMigrationNeeded: true
    })
      .then(realm => {
        realm.write(() => {
          // for DEV ENV TB
          // realm.deleteAll();
        });

        const user = realm.objects("UserSelf")[0];
        console.log("User if user exists:", user);

        if (!user) {
          this.props.navigation.replace("Setup");
        } else {
          console.log("Setting userId", user);
          this.props.navigation.getScreenProps().setUserId(user.userId);
          this.props.navigation.replace("Home");
        }
      })
      .catch(error => {
        console.log(
          error,
          "Error: components did mount, initialize screen ******"
        );
      });
  };

  render() {
    return (
      <ImageBackground
        source={require("../images/astronaut-4106766_640.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View>
          <Text>Loading ....</Text>
        </View>
      </ImageBackground>
    );
  }
}

export default InitializeScreen;
