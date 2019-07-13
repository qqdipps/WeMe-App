import React, { Fragment } from "react";
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  View
} from "react-native";
import MySocket from "./components/MySocket";
import SetupScreen from "./screens/SetupScreen";

const App = () => {
  return (
    <Fragment>
      <MySocket />
      <SetupScreen />
    </Fragment>
  );
};

const styles = StyleSheet.create({});

export default App;
