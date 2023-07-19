import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { propsNavigationStack } from "./modules/app.modules";
import Store from "@screens/Store";
import Ticket from "@screens/Ticket";

const { Navigator, Screen } =
  createNativeStackNavigator<propsNavigationStack>();
export function AppStack() {
  return (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Screen component={Home} name="Home" />
      <Screen component={Store} name="Store" />
      <Screen component={Ticket} name="Ticket" />
    </Navigator>
  );
}
