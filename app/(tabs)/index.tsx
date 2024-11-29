import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log("Splash Screen Loaded"); // Debugging log
    const timeout = setTimeout(() => {
      console.log("Navigating to Login Screen"); // Debugging log
      router.replace("/auth/login");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <LinearGradient
      colors={["#4299E1", "#F56565"]} // Gradient colors
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/catranco_logo.png")}
        style={{
          width: 550,
          height: 550,
        }}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}
