/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  View
} from "react-native";
import MySocket from "./components/MySocket";
import MyButton from "./components/MyButton";

const App = () => {
  return (
    <ImageBackground
      source={require("./images/astronaut-4106766_640.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.layout}>
        <MySocket />
        <MyButton style={styles.myButton} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center"
  },
  myButton: {
    marginBottom: 200
  }
});

export default App;
