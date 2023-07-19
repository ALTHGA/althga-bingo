import { IRoom } from "@dtos/IRoom";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Home: undefined;
  Ticket: { data: IRoom };
  Store: { data: IRoom };
};

export type propsStack = NativeStackNavigationProp<
  propsNavigationStack,
  "Home"
>;
