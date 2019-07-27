import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

const Disconnect = ({ callBack, text }) => {
  const handleButtonPress = () => {
    this._onPressButton;
    callBack();
  };

  return (
    <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
      <LinearGradient
        colors={["#F3ebee", "#A7b4ae"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text style={styles.buttonText}>⚠️ Disconnect ⚠️</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 30,
    fontFamily: "Gill Sans",
    textAlign: "center",
    padding: 15,
    paddingVertical: 10,
    color: "black"
  },
  button: {
    marginBottom: 50,
    width: 300
    // height: 300
  }
});

export default Disconnect;
