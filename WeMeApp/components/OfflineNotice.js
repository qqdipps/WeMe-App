import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

class OfflineNotice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false
    };

    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
  }

  componentDidMount() {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Is connected?", state.isConnected);
      this.handleConnectivityChange(state.isConnected);
    });

    // Unsubscribe
  }

  componentWillUnmount() {
    unsubscribe();
  }

  handleConnectivityChange = connectedStatus => {
    this.setState({ isConnected: connectedStatus });
  };

  render() {
    if (!this.state.isConnected) {
      return (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 0
  },
  offlineText: { color: "#fff" }
});

export default OfflineNotice;
