import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import moment from "moment";

import { faker } from "@faker-js/faker";
import { RFValue } from "react-native-responsive-fontsize";
import { Audio } from "expo-av";

import { useNavigation } from "@react-navigation/native";

import { propsStack } from "@routes/modules/app.modules";
import theme from "@global/theme";

const { width } = Dimensions.get("window");

var tempoAleatorio = Math.floor(Math.random() * 2) + 1;
var tempoEmMilissegundos = tempoAleatorio * 30 * 1000;

export default function Automatic() {
  const navigation = useNavigation<propsStack>();
  const [sound, setSound] = useState<any>();
  const [name, setName] = useState(faker.person.firstName());
  const [translateX] = useState(new Animated.Value(-width - 100));

  async function playSound() {
    try {
      const { sound: snd, status } = await Audio.Sound.createAsync(
        require("@assets/sounds/coin.mp3"),
        { shouldPlay: true, volume: 0.05 }
      );

      setSound(snd);
      await snd.playAsync();
    } catch (error) {
      console.log(error);
    }
    return sound;
  }

  function handleCreateToRoom() {
    navigation.navigate("Store", {
      data: {
        amount: 0,
        likes: 0,
        product: {
          description: faker.lorem.paragraph(),
          name: "500 crédits",
          images: Array(2)
            .fill("")
            .map(() => {
              return faker.image.urlPicsumPhotos();
            }),
        },
        startEnd: moment().toDate().toString(),
        startOf: moment().add(1, "hour").toDate().toString(),
        user: {
          id: faker.string.uuid(),
          name,
        },
      },
    });
  }

  const onShowToast = () => {
    playSound();
    Animated.spring(translateX, {
      useNativeDriver: true,
      toValue: 10,
    }).start(() => {
      setTimeout(() => {
        Animated.spring(translateX, {
          useNativeDriver: true,
          toValue: -width - 100,
        }).start();
      }, 2500);
    });

    setTimeout(() => {
      onShowToast(); // Chama a função novamente para exibir a próxima mensagem aleatória
    }, tempoEmMilissegundos);
  };

  useEffect(() => {
    setTimeout(function () {
      onShowToast();
    }, tempoEmMilissegundos);
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <LinearGradient
        start={{ x: 0.5, y: 0.0 }}
        colors={["#FFB55B", "#FFE146"]}
        style={styles.stroke}
      >
        <TouchableOpacity onPress={handleCreateToRoom}>
          <LinearGradient colors={["#FFE146", "#FFB55B"]} style={styles.card}>
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textDescription}>
              Criou uma sala, Entrar agora
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: getStatusBarHeight() + 10,
    zIndex: 100,
  },
  stroke: {
    padding: 2,
    overflow: "visible",
    backgroundColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  textName: {
    fontSize: RFValue(17),
    color: "#333",
    fontFamily: theme.fonts.medium,
  },
  textDescription: {
    fontSize: RFValue(15),
    color: "#fff",
    fontFamily: theme.fonts.regular,
  },
});
