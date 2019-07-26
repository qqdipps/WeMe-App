/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import AppWithNotifications from "./AppWithNotifications";

global.WeMeServerAddress = "wemeapi.gigalixirapp.com";
AppRegistry.registerComponent(appName, () => AppWithNotifications);
