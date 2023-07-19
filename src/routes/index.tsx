import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./app.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
