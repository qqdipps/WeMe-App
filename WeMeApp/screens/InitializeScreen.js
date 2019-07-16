import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";

class InitializeScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.schema);
  }

  componentDidMount = () => {
    Realm.open({
      schema: this.props.schema,
      deleteRealmIfMigrationNeeded: true
    })
      .then(realm => {
        // realm.write(() => {   // for DEV ENV TB
        //   realm.deleteAll();
        // });

        let user = realm.objects("UserSelf");
        console.log(user);
        // if (user === {}) {
        //   console.log("here I am in user if");
        // ;
        // }
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
