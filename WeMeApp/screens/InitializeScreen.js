import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import { weMeSocket } from "../functions/weMeSocket";

class InitializeScreen extends Component {
  constructor(props) {
    super(props);
  }

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
          realm.deleteAll();
        });

        let user = realm.objects("UserSelf");
        console.log(user);

        if (!user[0]) {
          this.props.navigation.replace("Setup");
        } else {
          this.props.navigation.replace("Home");
        }
      })
      .catch(error => {
        console.log(error, "<- this is an error ******");
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
