import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { IRoom } from "@dtos/IRoom";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "@routes/modules/app.modules";

interface Props {
  data: IRoom;
}

const { width } = Dimensions.get("window");
export default function Card({ data }: Props) {
  const navigation = useNavigation<propsStack>();
  const hour = moment(data.startOf).diff(data.startEnd);
  const duracao = moment.duration(hour);
  const horas = duracao.hours();
  const minutos = duracao.minutes();
  const segundos = duracao.seconds();

  const navigateToStore = () => {
    navigation.navigate("Store", { data });
  };

  return (
    <LinearGradient
      start={{ x: 0.5, y: 0.5 }}
      colors={["#F79824", "#FDCA40"]}
      style={styles.container}
    >
      <LinearGradient style={styles.card} colors={["#FDCA40", "#F79824"]}>
        <View style={styles.header}>
          <Text style={styles.textLive}>LIVE</Text>
          <View style={styles.live} />
        </View>

        <View style={styles.detail}>
          <Text style={styles.textUserName}>{data.user.name}</Text>
          <Text numberOfLines={1} style={styles.textTitle}>
            {data.product.name}
          </Text>
          <Text
            style={styles.textHours}
          >{`Termina: ${horas}h ${minutos}m ${segundos}s`}</Text>
        </View>
        <Image
          resizeMode="contain"
          source={{
            uri: data.product.images[0],
          }}
          style={styles.image}
        />

        <LinearGradient
          style={styles.buttonStroke}
          colors={["#FFE146", "#FFB55B"]}
        >
          <TouchableOpacity onPress={navigateToStore}>
            <LinearGradient
              start={{ x: 0.1, y: 0.2 }}
              style={styles.button}
              colors={["#F79824", "#F9FD33"]}
            >
              <Text style={styles.textButton}>R$ 10,00 p/ cartela</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  card: {
    width: width / 2 - 25,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textLive: {
    fontSize: RFValue(12),
    color: "#FFF",
    fontFamily: "Oswald_500Medium",
  },
  live: {
    height: RFValue(5),
    width: RFValue(5),
    borderRadius: RFValue(5 / 2),
    backgroundColor: "#F9FD33",
  },
  detail: {
    paddingTop: 25,
  },
  textUserName: {
    fontSize: RFValue(12),
    color: "#F9FD33",
    fontFamily: "Oswald_500Medium",
  },
  textTitle: {
    fontSize: RFValue(15),
    color: "#FFF",
    fontFamily: "Oswald_500Medium",
  },
  textHours: {
    fontSize: RFValue(15),
    color: "#333",
    fontFamily: "Oswald_400Regular",
  },
  image: {
    height: RFValue(100),
    width: "100%",
    borderRadius: 15,
  },
  buttonStroke: {
    padding: 2,
    borderRadius: 10,
    marginTop: 25,
  },
  button: {
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textButton: {
    fontSize: RFValue(15),
    color: "#333",
    fontFamily: "Oswald_500Medium",
  },
});
