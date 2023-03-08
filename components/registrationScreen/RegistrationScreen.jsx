import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { styles } from "./RegistrationScreen.styled";
import * as ImagePicker from "expo-image-picker";
import LoadAvatarComponent from "../../assets/images/plus.svg";

const ShadowPresets = {
  input: {
    distance: 4,
    sides: "left" | "right" | "bottom",
    offset: [0, 4],
    startColor: "rgba(0, 0, 0, 0.25)",
  },
};

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [image, setImage] = useState(null);

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

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const showPassword = () => {
    isPasswordVisible && password
      ? setIsPasswordVisible(false)
      : setIsPasswordVisible(true);
  };

  const onLogin = () => {
    if (!login || !email || !password) return;
    Alert.alert("Credentials", `${login} + ${email} + ${password}`);
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/registration-bg.jpg")}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <View style={styles.form}>
              <View style={styles.avatar}>
                <Pressable style={styles.loadAvatarBtn} onPress={pickImage}>
                  <LoadAvatarComponent />
                </Pressable>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </View>
              <Text style={styles.title}>Регистрация</Text>

              <Shadow {...ShadowPresets.input}>
                <TextInput
                  value={login}
                  onFocus={() => setIsLoginActive(true)}
                  onBlur={() => setIsLoginActive(false)}
                  onChangeText={loginHandler}
                  placeholder="Логин"
                  style={[
                    styles.input,
                    {
                      borderColor: isLoginActive ? "#FF6C00" : "#E8E8E8",
                    },
                  ]}
                />
              </Shadow>

              <TextInput
                value={email}
                onFocus={() => setIsEmailActive(true)}
                onBlur={() => setIsEmailActive(false)}
                onChangeText={emailHandler}
                placeholder="Адрес электронной почты"
                style={[
                  styles.input,
                  { borderColor: isEmailActive ? "#FF6C00" : "#E8E8E8" },
                ]}
              />

              <TextInput
                value={password}
                onFocus={() => setIsPasswordActive(true)}
                onBlur={() => setIsPasswordActive(false)}
                onChangeText={passwordHandler}
                placeholder="Пароль"
                secureTextEntry={!isPasswordVisible}
                style={[
                  styles.input,
                  styles.passwordInput,
                  { borderColor: isPasswordActive ? "#FF6C00" : "#E8E8E8" },
                  ,
                ]}
              />
              <Pressable onPress={showPassword} style={styles.showPasswordBtn}>
                <Text style={styles.showPasswordBtnText}>
                  {isPasswordVisible ? "Показать" : "Скрыть"}
                </Text>
              </Pressable>

              <Pressable onPress={onLogin} style={styles.logBtn}>
                <Text style={styles.logBtnText}>Зарегистрироваться</Text>
              </Pressable>
              <Text style={styles.loginLink}>Уже есть аккаунт? Войти</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
