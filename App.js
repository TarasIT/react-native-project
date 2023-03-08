import React from "react";
import { Home } from "./components/HomeScreen/HomeScreen";
import { LoginScreen } from "./components/loginScreen/LoginScreen";
import { RegistrationScreen } from "./components/registrationScreen/RegistrationScreen";
import { CreatePostScreen } from "./components/CreatePostsScreen/CreatePostScreen";
import { PostsScreen } from "./components/PostsScreen/PostsScreen";
import { CommentsScreen } from "./components/CommentsScreen/CommentsScreen";
import { ProfileScreen } from "./components/ProfileScreen/ProfileScreen";

export default function App() {
  // return <LoginScreen />;
  // return <RegistrationScreen />;
  // return <Home />;
  // return <CreatePostScreen />;
  // return <PostsScreen />;
  // return <CommentsScreen />;
  return <ProfileScreen />;
}
