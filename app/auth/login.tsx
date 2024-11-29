import React from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" />

      {/* LinearGradient Background */}
      <LinearGradient
        colors={["#f9fbff", "#ecfae6", "#c5d5f9", "#9a92ff"]}
        style={styles.gradientBackground}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../../assets/images/catranco_logo.png")}
          />
        </View>

        {/* Fill-up Form */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
                style={styles.input}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButtonWrapper}
              onPress={() => router.push("/home")} // Navigate to the "home" route
            >
              <LinearGradient
                colors={["#3b82f6", "#ef4444"]}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={() => router.push("/auth/signup")} // Navigate to the "signup" route
            >
              <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>

            {/* Test Button */}
            <TouchableOpacity
              style={styles.testButton}
              onPress={() => router.push("/(tabs)/dispatch")} // Navigate to a "test" route
            >
              <Text style={styles.testButtonText}>Test Button</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gradientBackground: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.1,
  },
  logo: {
    height: height * 0.25,
    width: width * 0.7,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    alignItems: "center",
  },
  formContainer: {
    marginTop: height * 0.05,
    width: "100%",
  },
  inputWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    color: "#000",
  },
  loginButtonWrapper: {
    width: "100%",
    marginTop: 8,
  },
  loginButton: {
    height: height * 0.075,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  createAccountButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: "center",
  },
  createAccountText: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "bold",
  },
  testButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: "center",
  },
  testButtonText: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "bold",
  },
});

export default LoginScreen;
