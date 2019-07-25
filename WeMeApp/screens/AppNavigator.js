import { createStackNavigator, createAppContainer } from "react-navigation";
import InitializeScreen from "./InitializeScreen";
import SetupScreen from "./SetupScreen";
import HomeScreen from "./HomeScreen";
import SpawnScreen from "./SpawnScreen";
import CaptureScreen from "./CaptureScreen";
import BeamCollectionScreen from "./BeamCollectionScreen";
import BeamUIScreen from "./BeamUIScreen";

const rootStack = createStackNavigator({
  Initialize: { screen: InitializeScreen },
  Setup: { screen: SetupScreen },
  Home: { screen: HomeScreen },
  Spawn: { screen: SpawnScreen },
  Capture: { screen: CaptureScreen },
  BeamCollection: { screen: BeamCollectionScreen },
  BeamUI: { screen: BeamUIScreen }
});

const AppContainer = createAppContainer(rootStack);
export default AppContainer;
