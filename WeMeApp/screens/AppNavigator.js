import { createStackNavigator, createAppContainer } from "react-navigation";
import InitializeScreen from "./InitializeScreen";
import SetupScreen from "./SetupScreen";
import HomeScreen from "./HomeScreen";
import SpawnScreen from "./SpawnScreen";
import CaptureScreen from "./CaptureScreen";
import BeamCollectionScreen from "./BeamCollectionScreen";
import BeamUIScreen from "./BeamUIScreen";
import SettingsScreen from "./SettingsScreen";

const rootStack = createStackNavigator(
  {
    Initialize: { screen: InitializeScreen },
    Setup: { screen: SetupScreen },
    Home: { screen: HomeScreen },
    Spawn: { screen: SpawnScreen },
    Capture: { screen: CaptureScreen },
    BeamCollection: { screen: BeamCollectionScreen },
    BeamUI: { screen: BeamUIScreen },
    Settings: { screen: SettingsScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#91A19A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppContainer = createAppContainer(rootStack);
export default AppContainer;
