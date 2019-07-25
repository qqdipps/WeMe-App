/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

global.WeMeServerAddress = "wemeapi.gigalixirapp.com";
AppRegistry.registerComponent(appName, () => App);
