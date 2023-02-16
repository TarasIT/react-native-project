import React, { useState, useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { styles } from "./LoginScreen.styled";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const showPassword = () => {
    isPasswordVisible && password
      ? setIsPasswordVisible(false)
      : setIsPasswordVisible(true);
  };
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    if (!email || !password) return;
    Alert.alert("Credentials", `${email} + ${password}`);
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
              <Text style={styles.title}>Войти</Text>

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
                <Text style={styles.logBtnText}>Войти</Text>
              </Pressable>
              <Text style={styles.loginLink}>
                Нет аккаунта? Зарегистрироваться
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
