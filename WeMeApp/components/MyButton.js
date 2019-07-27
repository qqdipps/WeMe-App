import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const MyButton = ({ callBack, text }) => {
  const handleButtonPress = () => {
    this._onPressButton;
    callBack();
  };

  return (
    <TouchableOpacity onPress={handleButtonPress}>
      <LinearGradient
        colors={["#Ffa163", "#c10087"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 25,
    fontFamily: "Gill Sans",
    textAlign: "center",
    padding: 15,
    color: "white"
  },
  button: {
    marginBottom: 150,
    width: 250,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

export default MyButton;
