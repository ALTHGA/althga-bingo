import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";

import Icon from "@expo/vector-icons/Ionicons";

import { IRoom } from "@dtos/IRoom";
import Header from "@components/ui/Header";
import theme from "@global/theme";
import { faker } from "@faker-js/faker";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import moment from "moment";
import { propsStack } from "@routes/modules/app.modules";

interface RouteParams {
  data: IRoom;
}

const { height, width } = Dimensions.get("window");
export default function Store() {
  const route = useRoute();
  const navigation = useNavigation<propsStack>();
  const { data } = route.params as RouteParams;
  const { amount, likes, product, startEnd, startOf, user, id } = data;

  const [hours, setHours] = useState(moment(data.startOf).diff(moment()));

  const duracao = moment.duration(hours);
  const horas = duracao.hours();
  const minutos = duracao.minutes();
  const segundos = duracao.seconds();

  const [imageSelected, setImageSelected] = useState(product.images[0]);

  const handleSelectedImage = (index: number) => {
    setImageSelected(product.images[index]);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      setHours(moment(data.startOf).diff(moment()));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <View style={styles.hours}>
            <Text
              style={styles.textHours}
            >{`${horas}h ${minutos}m ${segundos}s`}</Text>
          </View>
          <Image
            resizeMode="cover"
            style={styles.album}
            source={{ uri: imageSelected }}
          />

          <ScrollView
            contentContainerStyle={{ marginTop: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {product.images.map((uri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectedImage(index)}
              >
                <Image style={styles.albumImage} source={{ uri }} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.userDetail}>
            <Text style={styles.textUser}>{user.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity>
                <Icon
                  name="heart-outline"
                  size={RFValue(25)}
                  color={theme.colors.SECUNDARY}
                />
              </TouchableOpacity>
              <Text style={styles.textStart}>{data.likes}</Text>
            </View>
          </View>
          <Text style={styles.textProductName}>{product.name}</Text>
          <Text style={styles.textParaph}>{product.description}</Text>
        </View>

        <View style={styles.persons}>
          {Array(4)
            .fill("")
            .map((_, i) => (
              <Image
                key={i}
                style={[styles.avatar, { left: -i * 10 }]}
                source={{ uri: faker.image.avatar() }}
              />
            ))}

          <Text style={styles.textPerson}>
            + 150 pessoas estão participando
          </Text>
        </View>

        <View style={styles.footer}>
          <LinearGradient
            style={styles.buttonStroke}
            colors={["#FFE146", "#FFB55B"]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Ticket", { data })}
            >
              <LinearGradient
                start={{ x: 0.1, y: 0.2 }}
                style={styles.button}
                colors={["#F79824", "#F9FD33"]}
              >
                <Text style={styles.textButton}>
                  COMPRAR CARTELA R$ {data.amount.toFixed(2)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  album: {
    height: height / 3,
    width: width - 50,
  },

  albumImage: {
    height: RFValue(80),
    width: RFValue(80),
    opacity: 0.5,
    borderRadius: 5,
    marginRight: 5,
  },
  userDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  textUser: {
    fontSize: RFValue(15),
    fontFamily: theme.fonts.medium,
    color: theme.colors.TEXT,
    marginRight: 10,
  },
  textStart: {
    fontSize: RFValue(15),
    fontFamily: theme.fonts.medium,
    color: theme.colors.SECUNDARY,
    marginLeft: 5,
  },
  textProductName: {
    fontSize: RFValue(17),
    color: theme.colors.TEXT,
    fontFamily: theme.fonts.medium,
    marginTop: 5,
  },
  textParaph: {
    fontSize: RFValue(15),
    color: theme.colors.GRAY_500,
    fontFamily: theme.fonts.light,
  },
  persons: {
    flexDirection: "row",
    alignItems: "center",
    height: RFValue(50),
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.GRAY_400,
  },
  avatar: {
    height: RFValue(25),
    width: RFValue(25),
    borderRadius: RFValue(25 / 2),
    borderWidth: 1,
    borderColor: theme.colors.SECUNDARY,
  },
  textPerson: {
    fontSize: RFValue(15),
    color: theme.colors.GRAY_500,
    fontFamily: theme.fonts.regular,
    left: -15,
  },
  footer: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: getStatusBarHeight() + 10,
  },
  buttonStroke: {
    padding: 2,
    width: "90%",
    borderRadius: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: RFValue(15),
    color: theme.colors.TEXT,
    fontFamily: theme.fonts.medium,
  },
  hours: {
    position: "absolute",
    zIndex: 1,
    top: 25,
    right: 50,
    backgroundColor: theme.colors.SECUNDARY,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  textHours: {
    fontSize: RFValue(15),
    color: "#333",
    fontFamily: theme.fonts.regular,
  },
});
