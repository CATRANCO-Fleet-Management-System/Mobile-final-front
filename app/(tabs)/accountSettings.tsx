// updateAccount.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Sidebar from "../components/sidebar";
import { getUser, updateAccount } from "@/services/authentication/authServices";
// import renderImage from "@/constants/renderImage/renderImage";

const accountSettings = () => {
  // State for managing profile data
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("dis_cogon");
  const [email, setEmail] = useState("dis_cogon@example.com");

  // State to control the visibility of the sidebar
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleSave = () => {
    // Handle the save logic here (e.g., API request to update the profile)
    alert("Profile Saved!");
  };

  const handleCancel = () => {
    // Handle the cancel action (e.g., navigate back or reset fields)
    alert("Changes Cancelled");
  };

  return (
    <View style={styles.container}>
      {/* Sidebar component */}
      <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />

      {/* Profile Edit Section */}
      <ScrollView style={styles.editProfileContainer}>
        <View style={styles.profilePicContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../assets/images/catranco_logo.png")
            } // Default image if none set
            style={styles.profilePic}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.inputField}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.inputField}
        />
        
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          keyboardType="password"
          style={styles.inputField}
        />

        <Text style={styles.label}>Re-password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          keyboardType="password"
          style={styles.inputField}
        />

        {/* Save and Cancel Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleCancel}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSave}
            style={[styles.button, styles.saveButton]}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sidebar toggle button */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
        <Icon name="menu" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  editProfileContainer: {
    marginTop: 80, // Adjust for sidebar
    padding: 20,
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#00000099",
    padding: 5,
    borderRadius: 15,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    fontWeight: "bold",
  },
  inputField: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  menuButton: {
    position: "absolute",
    top: 30,
    left: 20,
  },
});

export default accountSettings;