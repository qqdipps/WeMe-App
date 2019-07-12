import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const MyButton = () => {
  return (
    <TouchableOpacity onPress={this._onPressButton}>
      <LinearGradient
        colors={["pink", "#ff1c3a"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.linearGradient}
      >
        <Text style={styles.buttonText}>Let's Get Started!</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    padding: 15,
    color: "white"
  },
  linearGradient: {
    marginBottom: 200,
    width: 250
  }
});

export default MyButton;
