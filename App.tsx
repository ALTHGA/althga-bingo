import "moment/locale/pt-br";
import React, { useCallback, useState } from "react";
import Routes from "@routes/index";

import {
  useFonts,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
    Oswald_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }
  return <Routes />;
}
