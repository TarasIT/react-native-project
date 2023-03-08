import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Keyboard,
  TextInput,
  FlatList,
} from "react-native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import moment from "moment/min/moment-with-locales";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { styles } from "./CommentsScreen.styled";
import BackSvgBtn from "../../assets/images/arrow-left.svg";
import SendSvgBtn from "../../assets/images/arrow-up.svg";

export const CommentsScreen = () => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Inter-Regular": require("../../assets/fonts/Inter/Inter-Regular.ttf"),
  });

  const transformDate = () => {
    moment.locale("ru");
    return moment().format("DD MMMM, YYYY | HH:mm");
  };

  const onCommentSend = () => {
    if (!comment) return;
    setAllComments([
      ...allComments,
      { comment, id: nanoid(), date: transformDate() },
    ]);
    setComment("");
    Keyboard.dismiss();
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const logOut = () => {};

  if (!fontsLoaded) return null;

  const renderComments = ({ item }) => {
    return (
      <View key={item.id} style={styles.commentSection}>
        <View style={[styles.commentBox, styles.userComment]}>
          <Text style={styles.comment}>{item.comment}</Text>
          <Text style={[styles.commentDate, { marginRight: "auto" }]}>
            {item.date}
          </Text>
        </View>
        <View style={styles.userAvatarBox}>
          <Image
            source={
              image
                ? { uri: image }
                : require("../../assets/images/avatar-placeholder.jpg")
            }
            style={styles.userAvatar}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.header}>
        <Pressable onPress={logOut} style={styles.backBtn}>
          <BackSvgBtn />
        </Pressable>
        <Text style={styles.title}>Комментарии</Text>
      </View>

      <View style={styles.postsBox}>
        <View style={styles.photoSection}>
          <Image style={styles.post} />
        </View>
        <FlatList
          data={allComments}
          renderItem={renderComments}
          keyExtractor={(item) => item.id}
        />

        {/* <View style={styles.commentSection}>
            <View style={styles.userAvatarBox}>
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("../../assets/images/avatar-placeholder.jpg")
                }
                style={styles.userAvatar}
              />
            </View>
            <View style={[styles.commentBox, styles.companionComment]}>
              <Text style={styles.comment}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                totam ut commodi, officia nihil incidunt perferendis corrupti
                pariatur ducimus nobis quae nisi blanditiis eligendi suscipit
                voluptate placeat non. Natus, dolorem?
              </Text>
              <Text style={[styles.commentDate, { marginLeft: "auto" }]}>
                09 июня, 2020 | 08:40
              </Text>
            </View>
          </View>
          <View style={styles.commentSection}>
            <View style={[styles.commentBox, styles.userComment]}>
              <Text style={styles.comment}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                totam ut commodi, officia nihil incidunt perferendis corrupti
                pariatur ducimus nobis quae nisi blanditiis eligendi suscipit
                voluptate placeat non. Natus, dolorem?
              </Text>
              <Text style={[styles.commentDate, { marginRight: "auto" }]}>
                09 июня, 2020 | 08:40
              </Text>
            </View>
            <View style={styles.userAvatarBox}>
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("../../assets/images/avatar-placeholder.jpg")
                }
                style={styles.userAvatar}
              />
            </View>
          </View>  */}
      </View>

      <View style={{ position: "absolute", bottom: 0 }}>
        <TextInput
          value={comment}
          onChangeText={(text) => setComment(text)}
          placeholder="Комментировать"
          style={[styles.commentInput]}
        />
        <Pressable onPress={onCommentSend} style={styles.sendBtn}>
          <SendSvgBtn />
        </Pressable>
      </View>
    </View>
  );
};
