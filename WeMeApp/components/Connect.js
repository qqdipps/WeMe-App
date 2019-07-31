import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import { Icon } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";

const Connect = ({ callBack, text, icon }) => {
  const handleButtonPress = () => {
    this._onPressButton;
    callBack();
  };

  return (
    <TouchableOpacity onPress={handleButtonPress}>
      <View>
        <LinearGradient
          colors={["#F3ebee", "#A7b4ae"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.button}
        >
          <Icon name={icon} style={styles.buttonText}>
            <Text style={styles.buttonText}>{text}</Text>
          </Icon>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 30,
    fontFamily: "Gill Sans",
    textAlign: "center",
    padding: 15,
    paddingVertical: 25,
    color: "black"
  },
  button: {
    alignContent: "center",
    width: 250,
    height: 100,
    paddingLeft: -25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

export default Connect;
