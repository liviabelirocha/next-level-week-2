import React, { useState } from "react";
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavouriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";

import styles from "./styles";

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  const [isFavorited, setIsFavorited] = useState(props.favorited);

  function handleLinkToWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${props.teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");
    let favoritesArray = [];
    if (favorites) favoritesArray = JSON.parse(favorites);

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id == props.teacher.id;
      });
      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorited(false);
    } else {
      favoritesArray.push(props.teacher);
      setIsFavorited(true);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: props.teacher.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{props.teacher.name}</Text>
          <Text style={styles.subject}>{props.teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{props.teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"   "}
          <Text style={styles.priceValue}>R$ {props.teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favouriteButton,
              isFavorited ? styles.favourited : {},
            ]}
          >
            {isFavorited ? (
              <Image source={unfavouriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>
          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsApp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
