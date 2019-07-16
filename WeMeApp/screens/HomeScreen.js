import React from "react";
import { ImageBackground } from "react-native";

const HomeScreen = () => {
  return (
    <ImageBackground
      source={require("../images/stars-828650_640.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      {/* <DisplayName />
      <Connect />
      <Beams /> */}
    </ImageBackground>
  );
};

export default HomeScreen;
