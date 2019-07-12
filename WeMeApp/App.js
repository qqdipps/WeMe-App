/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";
import { StyleSheet, StatusBar, ImageBackground, Button } from "react-native";
import MySocket from "./components/MySocket";

const App = () => {
  return (
    <ImageBackground
      source={require("./images/astronaut-4106766_640.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      {/* <StatusBar barStyle="dark-content" /> */}
      <MySocket />
      {/* <Button /> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default App;
