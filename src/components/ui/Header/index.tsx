import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { Ionicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";
import { propsStack } from "@routes/modules/app.modules";

const { width } = Dimensions.get("window");
export default function Header() {
  const route = useRoute();
  const { replace } = useNavigation<propsStack>();

  let isHome = route.name === "Home";

  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <Ionicons
          style={{ marginRight: 10 }}
          name="search-outline"
          size={RFValue(25)}
          color={"#FFF"}
        />
        <Ionicons
          name="notifications-outline"
          size={RFValue(25)}
          color={"#FFF"}
        />
        <TouchableOpacity onPress={() => !isHome && replace("Home")}>
          <Image
            style={styles.logo}
            resizeMode="center"
            source={require("@assets/images/logo.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.buttonPlus}>
          <Ionicons name="add-outline" size={RFValue(25)} color={"#FFF"} />
        </TouchableOpacity>
        <Text style={styles.textAmount}>10000</Text>
        <TouchableOpacity>
          <Ionicons
            name="person-circle-outline"
            size={RFValue(25)}
            color={"#FFF"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight() + 10,
    paddingBottom: 10,
    paddingHorizontal: 25,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2176FF",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: RFValue(50),
    height: RFValue(50),
  },
  buttonPlus: {
    backgroundColor: "#33A1FD",
    height: RFValue(35),
    width: RFValue(35),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textAmount: {
    fontSize: RFValue(15),
    color: "#FFF",
    marginHorizontal: 5,
  },
});
