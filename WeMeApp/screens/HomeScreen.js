import React from "react";
import { ImageBackground } from "react-native";
import DisplayName from "../components/DisplayName";

const HomeScreen = props => {
  const { schema } = props.navigation.getScreenProps();
  return (
    <ImageBackground
      source={require("../images/stars-828650_640.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <DisplayName schema={schema} />
      {/* <Connect /> */}
      {/* <Beams /> */}
    </ImageBackground>
  );
};

export default HomeScreen;
