import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

const ResetApp = ({ callBack, text }) => {
  const handleButtonPress = () => {
    this._onPressButton;
    callBack();
  };

  return (
    <TouchableOpacity onPress={handleButtonPress}>
      <LinearGradient
        colors={["#F3ebee", "#A7b4ae"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>⚠️ Reset WeMe ⚠️</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 24,
    fontFamily: "Gill Sans",
    textAlign: "center",
    padding: 15,
    paddingVertical: 10,
    color: "black"
  },
  button: {
    // marginBottom: 25,
    width: 300,
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

export default ResetApp;
