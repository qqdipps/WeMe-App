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
        colors={["#e0e8e1", "#949FA0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Icon name="" style={styles.buttonText}>
          <Text style={styles.buttonText}> {props.text}</Text>
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
    color: "black"
  },
  button: {
    marginBottom: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

export default Beam;
