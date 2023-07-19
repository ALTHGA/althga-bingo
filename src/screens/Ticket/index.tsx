import { IRoom } from "@dtos/IRoom";
import { faker } from "@faker-js/faker";
import theme from "@global/theme";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedLottieView from "lottie-react-native";
import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

interface RouteParams {
  data: IRoom;
}

let ITEM_SIZE = width / 1.2;
let SPANCER_ITEM = (width - ITEM_SIZE) / 2;
export default function Ticket() {
  const route = useRoute();
  const { data } = route.params as RouteParams;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AnimatedLottieView
        resizeMode="cover"
        autoPlay
        loop={true}
        style={styles.background}
        source={require("@assets/lottie/background.json")}
      />

      <View style={{ alignItems: "center", justifyContent: "center", width }}>
        <Text style={styles.textTitle}>ESCOLHA SEUS TITULOS!</Text>
        <FlatList
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          horizontal
          decelerationRate={0}
          scrollEventThrottle={16}
          pagingEnabled
          snapToInterval={ITEM_SIZE + 10}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SPANCER_ITEM,
          }}
          renderItem={({ item }) => (
            <View style={styles.center}>
              <View style={styles.circle} />
              <View style={[styles.circle, { right: -15, left: "auto" }]} />

              <View style={styles.header}>
                <View style={styles.left}>
                  <Image
                    source={{ uri: data.product.images[0] }}
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.title}>{data.product.name}</Text>
                    <Text style={styles.hour}>1h 25min e 30seg</Text>
                  </View>
                </View>
                <Text style={styles.numberId}>140.530</Text>
              </View>

              <View style={styles.body}>
                {Array(20)
                  .fill("")
                  .map((_, i) => (
                    <View style={styles.character}>
                      <View style={styles.balls}>
                        <View style={styles.stroke}>
                          <Text style={styles.textBalls}>{i + 1}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>

              <View style={styles.footer}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.textAmount}>
                    R$ {data.amount.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    height,
    width,
  },
  center: {
    backgroundColor: "#FFF",
    width: ITEM_SIZE,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  circle: {
    height: RFValue(35),
    width: RFValue(33),
    borderRadius: RFValue(35 / 2),
    position: "absolute",
    zIndex: 1,
    top: "70%",
    left: -20,
    backgroundColor: "#E41D35",
  },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  character: {
    height: RFValue(50),
    width: RFValue(50),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.GRAY_400,
  },
  char: {
    fontSize: RFValue(20),
    color: "#FFF",
    fontFamily: theme.fonts.bold,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  balls: {
    height: RFValue(35),
    width: RFValue(35),
    backgroundColor: "#aaa",
    borderRadius: RFValue(35 / 2),
    alignItems: "center",
    justifyContent: "center",
  },
  stroke: {
    height: RFValue(30),
    width: RFValue(30),
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: RFValue(30 / 2),
    alignItems: "center",
    justifyContent: "center",
  },
  textBalls: {
    fontSize: RFValue(17),
    color: "#FFF",
    fontFamily: theme.fonts.medium,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: RFValue(35),
    width: RFValue(35),
    borderRadius: RFValue(35 / 2),
    marginRight: 10,
  },
  title: {
    fontSize: RFValue(15),
    color: theme.colors.TEXT,
    fontFamily: theme.fonts.medium,
  },
  hour: {
    fontSize: RFValue(15),
    color: theme.colors.GRAY_500,
    fontFamily: theme.fonts.regular,
  },
  numberId: {
    fontSize: RFValue(15),
    color: theme.colors.TEXT,
    fontFamily: theme.fonts.regular,
  },
  footer: {
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  button: {
    backgroundColor: "#E41D35",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 25,
  },
  textAmount: {
    color: "#FFF",
    fontFamily: theme.fonts.medium,
    fontSize: RFValue(20),
  },
  textTitle: {
    fontSize: RFValue(20),
    color: "#FFF",
    fontFamily: theme.fonts.bold,
  },
});
