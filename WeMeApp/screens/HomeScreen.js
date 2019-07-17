import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import DisplayName from "../components/DisplayName";
import Connect from "../components/Connect";

const HomeScreen = props => {
  const { schema } = props.navigation.getScreenProps();
  return (
    <ImageBackground
      source={require("../images/stars-828650_640.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.layout}>
        <DisplayName schema={schema} />
        <Connect style={styles.connect} />
        {/* <Beams /> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  connect: {}
});

export default HomeScreen;
