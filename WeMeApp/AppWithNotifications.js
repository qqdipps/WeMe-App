import React, { Component } from "react";
import { InAppNotificationProvider } from "react-native-in-app-notification";
import App from "./App.js";

class AppWithNotifications extends Component {
  render() {
    return (
      <InAppNotificationProvider>
        <App />
      </InAppNotificationProvider>
    );
  }
}

export default AppWithNotifications;
