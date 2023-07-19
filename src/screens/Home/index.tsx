import React, { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { Audio } from "expo-av";

import Card from "@components/list/Card";
import Header from "@components/ui/Header";
import Automatic from "@components/ui/Automatic";
import { IRoom } from "@dtos/IRoom";
import { faker } from "@faker-js/faker";
import moment from "moment";

const data: IRoom[] = Array(10)
  .fill("")
  .map(() => {
    return {
      id: faker.string.uuid(),
      amount: faker.number.float(),
      likes: faker.number.int(2),
      product: {
        name: faker.lorem.lines(1),
        description: faker.lorem.paragraph(),
        images: Array(10)
          .fill("")
          .map(() => faker.image.urlPicsumPhotos()),
      },
      startEnd: moment().toDate().toString(),
      startOf: moment().add(1, "hour").toDate().toString(),
      user: {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
      },
    };
  });

export default function Home() {
  const [sound, setSound] = useState<any>();

  async function playSound() {
    try {
      const { sound: snd, status } = await Audio.Sound.createAsync(
        require("@assets/sounds/background.mp3"),
        { isLooping: true }
      );

      setSound(snd);
      await snd.setVolumeAsync(0.01);
      await snd.playAsync();
    } catch (error) {
      console.log(error);
    }
    return sound;
  }

  useEffect(() => {
    playSound();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  return (
    <View style={styles.container}>
      <Automatic />
      <Header />
      <ScrollView>
        <View style={styles.thumbnail}>
          <Text style={styles.textThumbnail}>A sorte está do seu lado!</Text>
          <TouchableOpacity style={styles.buttonThumbnail}>
            <Text style={styles.textButtonThumbnail}>CONHECER AGORA</Text>
          </TouchableOpacity>
          <Image
            style={styles.imageThumbnail}
            source={require("@assets/images/thumbnail.png")}
          />
        </View>

        <View style={styles.ong}>
          <Image
            resizeMode="contain"
            style={styles.ongs}
            source={require("@assets/images/ong.png")}
          />
        </View>

        <Text style={styles.textClassPublic}>SALAS PUBLICAS</Text>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => <Card data={item} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnail: {
    paddingHorizontal: 25,
    paddingVertical: 25,
    alignItems: "flex-end",
    justifyContent: "center",
    height: RFValue(200),
  },
  textThumbnail: {
    fontSize: RFValue(35),
    color: "#FFF",
    textAlign: "right",
    fontFamily: "Oswald_500Medium",
  },
  imageThumbnail: {
    height: RFValue(200),
    width: Dimensions.get("window").width,
    position: "absolute",
    zIndex: -1,
  },
  buttonThumbnail: {
    padding: 10,
    backgroundColor: "#FDCA40",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonThumbnail: {
    fontSize: RFValue(17),
    color: "#333",
    fontFamily: "Oswald_500Medium",
  },
  ong: {
    paddingHorizontal: 15,
  },
  ongs: {
    width: "100%",
    height: RFValue(100),
  },
  textClassPublic: {
    fontSize: RFValue(15),
    fontFamily: "Oswald_500Medium",
    color: "#aaa",
    marginLeft: 15,
  },
});
