/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

global.WeMeServerAddress = "172.24.27.81:4000";
AppRegistry.registerComponent(appName, () => App);
