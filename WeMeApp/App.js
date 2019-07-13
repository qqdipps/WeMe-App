import React, { Fragment } from "react";
import { StyleSheet, StatusBar } from "react-native";
import MySocket from "./components/MySocket";
import SetupScreen from "./screens/SetupScreen";
import TestRealm from "./components/TestRealm";
import Realm from "realm";

const App = () => {
  const testingRealm = () => {
    const Dog = { name: "Dog", properties: { name: "string" } };
    Realm.open({ schema: [Dog] })
      .then(realm => {
        console.log(realm, "***********");
        console.log(realm.objects("Dog").length);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <Fragment>
      <MySocket />
      <StatusBar barStyle="dark-content" />
      <TestRealm />
      <SetupScreen />
      {testingRealm()}
    </Fragment>
  );
};

const styles = StyleSheet.create({});

export default App;
