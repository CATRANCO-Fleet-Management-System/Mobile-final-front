import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import Sidebar from "../components/sidebar";
import Icon from "react-native-vector-icons/Ionicons";
import TimerEdit from "../components/DispatchEdit";

interface Interval {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  timerLimit: number;
}

const ClockSetting: React.FC = () => {
  const [intervals, setIntervals] = useState<Interval[]>([
    {
      id: "1",
      name: "Normal Interval",
      startTime: "05:00 AM",
      endTime: "10:00 PM",
      timerLimit: 10,
    },
    {
      id: "2",
      name: "Rush Hour Interval",
      startTime: "05:00 AM",
      endTime: "10:00 AM",
      timerLimit: 5,
    },
  ]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentInterval, setCurrentInterval] = useState<Interval>({
    id: "",
    name: "",
    startTime: "",
    endTime: "",
    timerLimit: 0,
  });

  const handleAddInterval = () => {
    setCurrentInterval({
      id: "",
      name: "",
      startTime: "",
      endTime: "",
      timerLimit: 0,
    });
    setModalVisible(true);
  };

  const handleEditInterval = (id: string) => {
    const intervalToEdit = intervals.find((interval) => interval.id === id);
    if (intervalToEdit) {
      setCurrentInterval(intervalToEdit);
      setModalVisible(true);
    }
  };

  const handleUpdateInterval = (updatedInterval: Interval) => {
    setIntervals((prev) =>
      prev.map((interval) =>
        interval.id === updatedInterval.id ? { ...updatedInterval } : interval
      )
    );
    setModalVisible(false);
  };

  const handleCreateInterval = (newInterval: Interval) => {
    setIntervals((prev) => [
      ...prev,
      { id: Date.now().toString(), ...newInterval },
    ]);
    setModalVisible(false);
  };

  const handleDeleteInterval = (id: string) => {
    Alert.alert(
      "Delete Interval",
      "Are you sure you want to delete this interval?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setIntervals((prev) =>
              prev.filter((interval) => interval.id !== id)
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Sidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

      <Text style={styles.title}>Manage Intervals</Text>
      <Text style={styles.description}>
        Here you can manage the intervals for normal and rush hour schedules, as
        well as add new intervals.
      </Text>

      <FlatList
        data={intervals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.intervalItem}>
            <Text>{item.name}</Text>
            <Text>
              {item.startTime} - {item.endTime}
            </Text>
            <Text>Interval: {item.timerLimit} minutes</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditInterval(item.id)}
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteInterval(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Button title="Add New Interval" onPress={handleAddInterval} />

      <TouchableOpacity
        onPress={() => setSidebarVisible(!sidebarVisible)}
        style={styles.menuButton}
      >
        <Icon name="menu" size={30} color="black" />
      </TouchableOpacity>

      <TimerEdit
        visible={modalVisible}
        interval={currentInterval}
        onSave={currentInterval.id ? handleUpdateInterval : handleCreateInterval}
        onCancel={() => setModalVisible(false)}
        onChange={setCurrentInterval}
        title={currentInterval.id ? "Edit Interval" : "Create New Interval"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 70,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  intervalItem: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center the buttons horizontally
    marginTop: 10,
    width: "100%", // Ensure buttons take the full width of the container
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginRight: 10, // Add some space between buttons
    width: "45%", // Make the buttons wider
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    width: "45%", // Make the buttons wider
  },
  editText: {
    color: "#fff",
    textAlign: "center", // Center the text inside the button
  },
  deleteText: {
    color: "#fff",
    textAlign: "center", // Center the text inside the button
  },
  menuButton: {
    position: "absolute",
    top: 30,
    left: 20,
  },
});

export default ClockSetting;
