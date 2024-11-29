import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Dispatch Management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Dispatch Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Profile Settings</Text>
            </TouchableOpacity>
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
    position: "absolute",
    width: Dimensions.get("window").width * 0.6,
    height: "100%",
    backgroundColor: "#f5f5f5",
    zIndex: 1000,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  menuOptions: {
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Sidebar;
