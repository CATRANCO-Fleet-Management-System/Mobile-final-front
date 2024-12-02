import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router"; // Import Link from expo-router

const Sidebar = ({ isVisible, onClose }) => {
  return (
    <>
      {isVisible && (
        <View style={styles.sidebarContainer}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close-outline" size={30} color="black" />
          </TouchableOpacity>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Icon name="person-circle-outline" size={50} color="black" />
            <Text style={styles.profileName}>dis_cogon</Text>
          </View>

          {/* Menu Options */}
          <View style={styles.menuOptions}>
            {/* Dispatch Management Link */}
            <Link href="/(tabs)/dispatch" style={styles.menuItem}>
              <Text style={styles.menuText}>Dispatch Management</Text>
            </Link>
            {/* Dispatch Setting Link */}
            <Link href="/(tabs)/DispatchSettings" style={styles.menuItem}>
              <Text style={styles.menuText}>Dispatch Setting</Text>
            </Link>

            {/* Profile Settings Link */}
            <Link href="/(tabs)/EditProfile" style={styles.menuItem}>
              <Text style={styles.menuText}>Profile Settings</Text>
            </Link>

            {/* Logout Button */}
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: "absolute", // Make the sidebar absolute to stay on top
    top: 0, // Ensure it starts from the top of the screen
    left: 0, // Align to the left
    width: Dimensions.get("window").width * 0.6, // Set sidebar width (60% of screen)
    height: "110%", // Make it span the full height of the screen
    backgroundColor: "#f5f5f5", // Sidebar background color
    zIndex: 1000, // Ensure it stays on top of other elements
    paddingTop: 40, // Padding to avoid content from sticking to the top
    paddingLeft: 20, // Padding inside the sidebar
    shadowColor: "#000", // Shadow color for sidebar for depth effect
    shadowOffset: { width: 2, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 10, // Shadow radius for soft edges
  },
  closeButton: {
    position: "absolute", // Absolute positioning for the close button
    top: 20, // Top margin
    right: 20, // Right margin
  },
  profileSection: {
    alignItems: "center", // Center the profile section horizontally
    marginBottom: 30, // Bottom margin for spacing
  },
  profileName: {
    fontSize: 18, // Profile name font size
    fontWeight: "bold", // Make the profile name bold
    marginTop: 10, // Margin between profile icon and name
  },
  menuOptions: {
    marginTop: 20, // Margin for spacing between profile section and menu options
    flex: 1, // Ensure the menu options fill available space
  },
  menuItem: {
    paddingVertical: 15, // Padding for each menu item
    borderBottomWidth: 1, // Border at the bottom of each menu item
    borderBottomColor: "#ddd", // Border color for separation
  },
  menuText: {
    fontSize: 16, // Font size for the menu text
    color: "#333", // Color for menu text
  },
});

export default Sidebar;
