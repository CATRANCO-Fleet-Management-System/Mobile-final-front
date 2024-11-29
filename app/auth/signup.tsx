import React from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // Replace useNavigation with useRouter

const { width, height } = Dimensions.get('window');

const SignupScreen = () => {
  const router = useRouter(); // Use expo-router's useRouter

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />

      {/* LinearGradient Background */}
      <LinearGradient
        colors={['#9a92ff', '#c5d5f9', '#ecfae6', '#f9fbff']}
        style={styles.gradientBackground}
      >
        {/* Scrollable Form */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo and Title */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/catranco_logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Sign Up</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="gray"
                style={styles.input}
              />
            </View>
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
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Re-type Password"
                placeholderTextColor="gray"
                secureTextEntry
                style={styles.input}
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signupButtonWrapper}
              onPress={() => alert('Account Created Successfully!')}
            >
              <LinearGradient
                colors={['#3b82f6', '#ef4444']}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.signupButton}
              >
                <Text style={styles.signupButtonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Go Back Button */}
            <TouchableOpacity
              style={styles.goBackButton}
              onPress={() => router.push('/auth/login')} // Navigate back to the login screen
            >
              <Text style={styles.goBackButtonText}>Go Back</Text>
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
    backgroundColor: '#fff',
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: width * 0.08,
    paddingBottom: height * 0.05,
    paddingTop: height * 0.05,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    height: height * 0.2,
    width: width * 0.6,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  formContainer: {
    width: '100%',
    marginTop: height * 0.02,
  },
  inputWrapper: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  signupButtonWrapper: {
    marginTop: 16,
    width: '100%',
  },
  signupButton: {
    height: height * 0.075,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  signupButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  goBackButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  goBackButtonText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
