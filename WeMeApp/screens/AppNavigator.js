import { createStackNavigator, createAppContainer } from "react-navigation";
import InitializeScreen from "./InitializeScreen";
import SetupScreen from "./SetupScreen";
import HomeScreen from "./HomeScreen";

const rootStack = createStackNavigator({
  Initialize: { screen: InitializeScreen },
  Setup: { screen: SetupScreen },
  Home: { screen: HomeScreen }
});

const AppContainer = createAppContainer(rootStack);
export default AppContainer;
