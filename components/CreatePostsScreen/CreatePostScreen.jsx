import React, { useState, useCallback } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./CreatePostScreen.styled";
import BackSvgBtn from "../../assets/images/arrow-left.svg";
import DeleteSvgBtn from "../../assets/images/trash.svg";
import LocationSvgIcon from "../../assets/images/map.svg";
import CameraSvgIcon from "../../assets/images/camera.svg";

export const CreatePostScreen = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const backHome = () => {};

  const changeBgColorOfPostBtn = () => {
    return image && name && location
      ? { backgroundColor: "#FF6C00" }
      : { backgroundColor: "#F6F6F6" };
  };

  const changePostBtnTextColor = () => {
    return image && name && location ? { color: "#fff" } : { color: "#BDBDBD" };
  };

  const changeCameraBgColor = () => {
    return image
      ? { backgroundColor: "rgba(255, 255, 255, 0.3)" }
      : { backgroundColor: "#ffffff" };
  };

  if (!fontsLoaded) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.header}>
          <Pressable onPress={backHome} style={styles.backBtn}>
            <BackSvgBtn />
          </Pressable>
          <Text style={styles.title}>Создать публикацию</Text>
        </View>

        <View style={styles.photoSection}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
            />
          )}
          <Pressable
            style={[styles.cameraIconBox, changeCameraBgColor()]}
            onPress={pickImage}>
            <CameraSvgIcon />
          </Pressable>
          <Text style={styles.photoLoadTitle}>
            {image ? "Редактировать фото" : "Загрузите фото"}
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <View style={styles.postForm}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Название"
              style={[styles.input, { marginBottom: 16 }]}
            />

            <View style={styles.locationBox}>
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Местность"
                style={[styles.input, { paddingLeft: 28 }]}
              />
              <LocationSvgIcon style={styles.locationSvg} />
            </View>

            <Pressable style={[styles.postBtn, changeBgColorOfPostBtn()]}>
              <Text style={[styles.postBtnText, changePostBtnTextColor()]}>
                Опубликовать
              </Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Pressable
              style={styles.deletePostBtn}
              onPress={() => {
                setImage(null);
                setName("");
                setLocation("");
              }}>
              <DeleteSvgBtn />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
