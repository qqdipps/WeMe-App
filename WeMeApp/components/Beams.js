import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import { Icon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Beams = ({ callBack, text }) => {
  const handleButtonPress = () => {
    this._onPressButton;
    // callBack();
  };

  return (
    <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
      <LinearGradient
        colors={["#8f7386", "#200016"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Icon name="envelope" style={styles.buttonText}>
          <Text style={styles.buttonText}> BEAMS</Text>
        </Icon>
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
    color: "white"
  },
  button: {
    marginBottom: 50,
    width: 250
    // height: 300
  }
});

export default Beams;
