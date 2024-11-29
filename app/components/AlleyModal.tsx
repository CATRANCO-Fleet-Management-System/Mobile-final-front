import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface AlleyModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedBus: { bus: string; status: string } | null;
  onConfirm: () => void; // Prop for resetting the timer
}

const AlleyModal: React.FC<AlleyModalProps> = ({
  isVisible,
  onClose,
  selectedBus,
  onConfirm,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Icon, Dynamic Bus Title, and Status */}
          <View style={styles.header_wrapper}>
            <View style={styles.header}>
              <Icon name="bus" size={50} color="black" />
              <View style={styles.titleWrapper}>
                <Text style={styles.busTitle}>
                  {selectedBus?.bus || "No Bus Selected"}
                </Text>
                <Text style={styles.busStatus}>
                  {selectedBus?.status || "No Status Available"}
                </Text>
                <Text style={styles.StatusText}>CURRENT STATUS</Text>
              </View>
            </View>
          </View>

          {/* Alley Label */}
          <Text style={styles.dispatchLabel}>On Alley In:</Text>

          {/* Alley Options */}
          <View style={styles.dispatchOptions}>
            {["Cogon", "Canitoan", "Silver Creek"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOptionButton,
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dispatchButton}
              onPress={() => {
                onConfirm(); // Reset the timer
                onClose(); // Close the modal
              }}
            >
              <Text style={styles.dispatchText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 5,
  },
  header_wrapper: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleWrapper: {
    marginLeft: 15,
  },
  busTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  busStatus: {
    fontSize: 18,
    color: "gray",
    marginTop: 5,
  },
  StatusText: {
    color: "red",
    fontSize: 15,
  },
  dispatchLabel: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "black",
    textAlign: "center",
  },
  dispatchOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#ADFF2F",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedOptionButton: {
    borderColor: "red",
    borderWidth: 2,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF6347",
    marginRight: 10,
  },
  dispatchButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6347",
  },
  dispatchText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default AlleyModal;
