import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import InitializeScreen from "./InitializeScreen";
import SetupScreen from "./SetupScreen";
import HomeScreen from "./HomeScreen";
import SpawnScreen from "./SpawnScreen";
import CaptureScreen from "./CaptureScreen";
import BeamCollectionScreen from "./BeamCollectionScreen";
import BeamUIScreen from "./BeamUIScreen";
import UserSettingsScreen from "./UserSettingsScreen";
import ConnectionSettingsScreen from "./ConnectionSettingsScreen";

const rootStack = createStackNavigator(
  {
    Initialize: { screen: InitializeScreen },
    Setup: { screen: SetupScreen },
    Home: { screen: HomeScreen },
    Spawn: { screen: SpawnScreen },
    Capture: { screen: CaptureScreen },
    BeamCollection: { screen: BeamCollectionScreen },
    BeamUI: { screen: BeamUIScreen },
    UserSettings: { screen: UserSettingsScreen },
    ConnectionSettings: { screen: ConnectionSettingsScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#5d7173"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      }
    })
  }
);

const AppContainer = createAppContainer(rootStack);
export default AppContainer;
