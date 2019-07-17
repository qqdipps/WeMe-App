import { createStackNavigator, createAppContainer } from "react-navigation";
import InitializeScreen from "./InitializeScreen";
import SetupScreen from "./SetupScreen";
import HomeScreen from "./HomeScreen";
import SpawnScreen from "./SpawnScreen";

const rootStack = createStackNavigator({
  Initialize: { screen: InitializeScreen },
  Setup: { screen: SetupScreen },
  Home: { screen: HomeScreen },
  Spawn: { screen: SpawnScreen }
});

const AppContainer = createAppContainer(rootStack);
export default AppContainer;
