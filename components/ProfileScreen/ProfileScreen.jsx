import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { nanoid } from "nanoid";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { styles } from "./ProfileScreen.styled";
import * as ImagePicker from "expo-image-picker";
import DeleteAvatarComponent from "../../assets/images/cross.svg";
import LogOutComponent from "../../assets/images/log-out.svg";
import MenuSvgBtn from "../../assets/images/menu.svg";
import AddSvgBtn from "../../assets/images/plus-footer-profile.svg";
import UserSvgBtn from "../../assets/images/user-profile.svg";
import LikeIcon from "../../assets/images/like.svg";
import CommentIcon from "../../assets/images/message-circle.svg";
import LocationIcon from "../../assets/images/map.svg";

export const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const posts = [
    {
      id: nanoid(),
      commentsCount: 11,
      likesCount: 32,
      location: "Ukraine",
      description: "Forest",
      image: "../../assets/images/registration-bg.jpg",
    },
    {
      id: nanoid(),
      commentsCount: 11,
      likesCount: 32,
      location: "Ukraine",
      description: "Forest",
      image: "../../assets/images/registration-bg.jpg",
    },
  ];

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const renderPosts = ({ item }) => {
    return (
      <View key={item.id}>
        <View style={styles.photoSection}>
          <Image style={styles.post} />
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.commentSection}>
          <View style={[styles.postItem, { marginRight: 24 }]}>
            <LikeIcon style={styles.reactions} />
            <Text style={styles.comment}>{item.commentsCount}</Text>
          </View>
          <View style={styles.postItem}>
            <CommentIcon style={styles.reactions} />
            <Text style={styles.comment}>{item.likesCount}</Text>
          </View>
          <View style={[styles.postItem, { marginLeft: "auto" }]}>
            <LocationIcon style={styles.map} />
            <Text style={[styles.comment, { textDecorationLine: "underline" }]}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/registration-bg.jpg")}>
        <View style={styles.form}>
          <View style={styles.avatar}>
            <Pressable style={styles.deleteAvatarBtn} onPress={pickImage}>
              <DeleteAvatarComponent />
            </Pressable>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
          <Text style={styles.userName}>User Name</Text>
          <LogOutComponent style={styles.logOutBtn} />
          <FlatList
            data={posts}
            renderItem={renderPosts}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ImageBackground>

      <View style={styles.footer}>
        <Pressable>
          <MenuSvgBtn width={24} height={24} />
        </Pressable>
        <Pressable style={styles.user}>
          <UserSvgBtn width={24} height={24} />
        </Pressable>
        <Pressable style={styles.addBtn}>
          <AddSvgBtn />
        </Pressable>
      </View>
    </View>
  );
};
