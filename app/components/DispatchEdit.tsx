import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

interface TimerEditProps {
  visible: boolean;
  interval: Interval;
  onSave: (interval: Interval) => void;
  onCancel: () => void;
  onChange: (interval: Interval) => void;
  title: string; // Ensure the type is string
}

const TimerEdit: React.FC<TimerEditProps> = ({
  visible,
  interval,
  onSave,
  onCancel,
  onChange,
  title, // Receive the dynamic title prop
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>{" "}
          {/* Display the dynamic title */}
          <Text style={styles.fieldLabel}>Title:</Text>
          <TextInput
            style={styles.input}
            placeholder="Interval Name"
            value={interval.name}
            onChangeText={(text) => onChange({ ...interval, name: text })}
          />
          <Text style={styles.fieldLabel}>Start Time:</Text>
          <TextInput
            style={styles.input}
            placeholder="Start Time"
            value={interval.startTime}
            onChangeText={(text) => onChange({ ...interval, startTime: text })}
          />
          <Text style={styles.fieldLabel}>End Time:</Text>
          <TextInput
            style={styles.input}
            placeholder="End Time"
            value={interval.endTime}
            onChangeText={(text) => onChange({ ...interval, endTime: text })}
          />
          <Text style={styles.fieldLabel}>Minutes Interval:</Text>
          <TextInput
            style={styles.input}
            placeholder="Timer Limit (minutes)"
            value={String(interval.timerLimit)}
            keyboardType="numeric"
            onChangeText={(text) =>
              onChange({ ...interval, timerLimit: parseInt(text) || 0 })
            }
          />
          <View style={styles.buttonContainer}>
            <Button title="Save Interval" onPress={() => onSave(interval)} />
            <Button title="Cancel" onPress={onCancel} color="gray" />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow effect
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "red", // Red title color
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    color: "#333", // Label color
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TimerEdit;
