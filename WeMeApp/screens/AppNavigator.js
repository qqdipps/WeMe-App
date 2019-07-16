import { createStackNavigator, createAppContainer } from "react-navigation";
import InitializeScreen from "./InitializeScreen";
import SetupScreen from "./SetupScreen";

const rootStack = createStackNavigator({
  Initialize: { screen: InitializeScreen },
  Setup: { screen: SetupScreen }
});

const AppContainer = createAppContainer(rootStack);
export default AppContainer;
