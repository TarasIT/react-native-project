import React, { useState, useCallback } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { styles } from "./HomeScreen.styled";
import LogOutSvgBtn from "../../assets/images/log-out.svg";
import MenuSvgBtn from "../../assets/images/menu.svg";
import UserSvgBtn from "../../assets/images/user.svg";
import AddPostSvgBtn from "../../assets/images/add-post.svg";

export const Home = () => {
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

      <View style={styles.user}>
        <View style={styles.userPhoto}>
          <Image style={{ width: "100%", height: "100%" }} />
        </View>
        <View>
          <Text style={styles.userName}>Name</Text>
          <Text style={styles.userEmail}>email</Text>
        </View>
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
