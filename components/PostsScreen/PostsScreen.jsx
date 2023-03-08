import React, { useState, useCallback } from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { styles } from "./PostsScreen.styled";
import LogOutSvgBtn from "../../assets/images/log-out.svg";
import MenuSvgBtn from "../../assets/images/menu.svg";
import UserSvgBtn from "../../assets/images/user.svg";
import AddPostSvgBtn from "../../assets/images/add-post.svg";
import CommentSvgBtn from "../../assets/images/comment-icon.svg";
import LocationSvgIcon from "../../assets/images/map.svg";

export const PostsScreen = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const logOut = () => {};

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.header}>
        <Text style={styles.title}>Публикации</Text>
        <Pressable onPress={logOut} style={styles.logOutBtn}>
          <LogOutSvgBtn width={24} height={24} />
        </Pressable>
      </View>

      <View style={styles.postsBox}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.user}>
            <View style={styles.userPhoto}>
              <Image style={{ width: "100%", height: "100%" }} />
            </View>
            <View>
              <Text style={styles.userName}>Name</Text>
              <Text style={styles.userEmail}>email</Text>
            </View>
          </View>

          <View style={styles.photoSection}>
            <Image style={styles.post} />
            <Text style={styles.postTitle}>Title</Text>
            <View style={styles.captionBox}>
              <Pressable
                style={[styles.commentAndLocation, { marginRight: 49 }]}>
                <CommentSvgBtn style={{ marginRight: 6 }} />
                <Text style={[styles.captionTitle, { color: "#BDBDBD" }]}>
                  0
                </Text>
              </Pressable>
              <Pressable style={styles.commentAndLocation}>
                <LocationSvgIcon style={{ marginRight: 6 }} />
                <Text
                  style={[
                    styles.captionTitle,
                    { textDecorationLine: "underline" },
                  ]}>
                  Location
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.photoSection}>
            <Image style={styles.post} />
            <Text style={styles.postTitle}>Title</Text>
            <View style={styles.captionBox}>
              <Pressable
                style={[styles.commentAndLocation, { marginRight: 49 }]}>
                <CommentSvgBtn style={{ marginRight: 6 }} />
                <Text style={[styles.captionTitle, { color: "#BDBDBD" }]}>
                  0
                </Text>
              </Pressable>
              <Pressable style={styles.commentAndLocation}>
                <LocationSvgIcon style={{ marginRight: 6 }} />
                <Text
                  style={[
                    styles.captionTitle,
                    { textDecorationLine: "underline" },
                  ]}>
                  Location
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.photoSection}>
            <Image style={styles.post} />
            <Text style={styles.postTitle}>Title</Text>
            <View style={styles.captionBox}>
              <Pressable
                style={[styles.commentAndLocation, { marginRight: 49 }]}>
                <CommentSvgBtn style={{ marginRight: 6 }} />
                <Text style={[styles.captionTitle, { color: "#BDBDBD" }]}>
                  0
                </Text>
              </Pressable>
              <Pressable style={styles.commentAndLocation}>
                <LocationSvgIcon style={{ marginRight: 6 }} />
                <Text
                  style={[
                    styles.captionTitle,
                    { textDecorationLine: "underline" },
                  ]}>
                  Location
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={logOut}>
          <MenuSvgBtn width={24} height={24} />
        </Pressable>
        <Pressable onPress={logOut} style={styles.addPostBtn}>
          <AddPostSvgBtn width={24} height={24} />
        </Pressable>
        <Pressable onPress={logOut}>
          <UserSvgBtn width={24} height={24} />
        </Pressable>
      </View>
    </View>
  );
};
