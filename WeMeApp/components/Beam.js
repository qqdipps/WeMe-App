import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

const Beam = props => {
  const handleButtonPress = () => {
    this._onPressButton;
    props.callBack(props.beamData);
  };

  return (
    <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
      {console.log(props)}
      <LinearGradient
        colors={["#Ffa163", "#c10087"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Icon name="envelope" style={styles.buttonText}>
          <Text style={styles.buttonText}>{props.text}</Text>
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

export default Beam;
