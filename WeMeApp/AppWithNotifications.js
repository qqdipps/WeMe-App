import React, { Component } from "react";
import { InAppNotificationProvider } from "react-native-in-app-notification";
import App from "./App.js";

class AppWithNotifications extends Component {
  render() {
    return (
      <InAppNotificationProvider
        closeInterval={2000}
        backgroundColour={"#fff"}
        height={55}
      >
        <App />
      </InAppNotificationProvider>
    );
  }
}

export default AppWithNotifications;
