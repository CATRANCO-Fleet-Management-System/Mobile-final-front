import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import Sidebar from "../components/sidebar";
import DispatchModal from "../components/DispatchModal";
import AlleyModal from "../components/AlleyModal";

const allBusData = [
  [
    { id: "1", bus: "BUS 001", status: "Cogon Alley", color: "#D3D3D3" },
    { id: "2", bus: "BUS 002", status: "On road To Cogon", color: "#ADFF2F" },
    {
      id: "3",
      bus: "BUS 003",
      status: "On road To SilverCreek",
      color: "#ADFF2F",
    },
    { id: "4", bus: "BUS 004", status: "Silver Alley", color: "#D3D3D3" },
    {
      id: "5",
      bus: "BUS 005",
      status: "On road To SilverCreek",
      color: "#ADFF2F",
    },
    { id: "6", bus: "BUS 006", status: "Cogon Alley", color: "#D3D3D3" },
  ],
  [
    { id: "7", bus: "BUS 007", status: "Cogon Alley", color: "#D3D3D3" },
    { id: "8", bus: "BUS 008", status: "On road To Cogon", color: "#ADFF2F" },
    {
      id: "9",
      bus: "BUS 009",
      status: "On road To SilverCreek",
      color: "#ADFF2F",
    },
    { id: "10", bus: "BUS 010", status: "Silver Alley", color: "#D3D3D3" },
    {
      id: "11",
      bus: "BUS 011",
      status: "On road To SilverCreek",
      color: "#ADFF2F",
    },
    { id: "12", bus: "BUS 012", status: "Cogon Alley", color: "#D3D3D3" },
  ],
];

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [dispatchModalVisible, setDispatchModalVisible] = useState(false);
  const [alleyModalVisible, setAlleyModalVisible] = useState(false);
  const [selectedBus, setSelectedBus] = useState<{
    bus: string;
    status: string;
  } | null>(null);
  const [timer, setTimer] = useState(600); // 10 minutes default (in seconds)
  const [isRunning, setIsRunning] = useState(false);
  const [intervalType, setIntervalTypeState] = useState<"normal" | "rush">(
    "normal"
  );

  const openDispatchModal = () => {
    if (selectedBus) {
      setDispatchModalVisible(true);
    } else {
      alert("Please select a bus first!");
    }
  };
  const closeDispatchModal = () => setDispatchModalVisible(false);

  const openAlleyModal = () => {
    if (selectedBus) {
      setAlleyModalVisible(true);
    } else {
      alert("Please select a bus first!");
    }
  };
  const closeAlleyModal = () => setAlleyModalVisible(false);

  const openSettingsModal = () => setMenuVisible(true);
  const closeSettingsModal = () => setMenuVisible(false);

  const resetTimer = () => {
    setTimer(intervalType === "normal" ? 600 : 300); // Reset to appropriate interval
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const setIntervalType = (type: "normal" | "rush") => {
    setIntervalTypeState(type);
    setTimer(type === "normal" ? 600 : 300); // Set timer based on interval type
    closeSettingsModal();
  };

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const handleSelectBus = (bus: { bus: string; status: string }) => {
    setSelectedBus(bus);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <Sidebar isVisible={sidebarVisible} onClose={toggleSidebar} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="menu" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.date}>{currentDate}</Text>
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 8.48211,
          longitude: 124.64706,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 8.48211, longitude: 124.64706 }}
          title="Example Location"
          description="Xavier University"
        />
      </MapView>

      {/* Swipeable Bus Status */}
      <FlatList
        data={allBusData}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.busPage}>
            <FlatList
              data={item}
              keyExtractor={(bus) => bus.id}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.busCard,
                    { backgroundColor: item.color },
                    selectedBus?.bus === item.bus && styles.selectedBusCard,
                  ]}
                  onPress={() =>
                    handleSelectBus({ bus: item.bus, status: item.status })
                  }
                >
                  <Icon name="bus" size={20} color="black" />
                  <Text style={styles.busText}>{item.bus}</Text>
                  <Text style={styles.statusText}>{item.status}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />

      {/* Timer with Settings and Reset Icon */}
      <View style={styles.timerContainer}>
        <TouchableOpacity onPress={toggleTimer} style={styles.playButton}>
          <Icon
            name={isRunning ? "pause-outline" : "play-outline"}
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={styles.resetButton}>
          <Icon name="refresh-outline" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.timerIconContainer}>
          <Icon name="time-outline" size={100} color="black" />
        </View>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        <Text style={styles.timerLabel}>for next dispatch</Text>
        <TouchableOpacity
          onPress={openSettingsModal}
          style={styles.settingsIcon}
        >
          <Icon name="settings-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.button, styles.dispatchButton]}
          onPress={openDispatchModal}
        >
          <Text style={styles.buttonText}>Dispatch</Text>
        </TouchableOpacity>

        {/* Dispatch Modal */}
        <DispatchModal
          isVisible={dispatchModalVisible}
          onClose={closeDispatchModal}
          selectedBus={selectedBus}
          onConfirm={resetTimer}
        />

        {/* Alley Modal */}
        <AlleyModal
          isVisible={alleyModalVisible}
          onClose={closeAlleyModal}
          selectedBus={selectedBus}
          onConfirm={resetTimer}
        />

        <TouchableOpacity
          style={[styles.button, styles.onAlleyButton]}
          onPress={openAlleyModal}
        >
          <Text style={styles.buttonText}>On Alley</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Modal */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={closeSettingsModal}
      >
        <TouchableWithoutFeedback onPress={closeSettingsModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalMenu}>
              <TouchableOpacity
                onPress={() => setIntervalType("normal")}
                style={styles.modalOption}
              >
                <Text style={styles.modalText}>Normal Interval</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIntervalType("rush")}
                style={styles.modalOption}
              >
                <Text style={styles.modalText}>Rush Hour Interval</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
  },
  map: {
    flex: 1,
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
    margin: 30,
  },
  busPage: {
    width: Dimensions.get("window").width - 40,
  },
  busCard: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedBusCard: {
    borderColor: "red",
    borderWidth: 2,
  },
  busText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "600",
  },
  statusText: {
    marginLeft: "auto",
    fontSize: 12,
    fontStyle: "italic",
  },
  timerContainer: {
    alignItems: "center",
    marginTop: -200,
  },
  timer: {
    fontSize: 40,
    fontWeight: "bold",
  },
  settingsIcon: {
    position: "absolute",
    top: 10,
    right: 180,
  },
  timerLabel: {
    fontSize: 14,
    color: "gray",
    marginBottom: 40,
  },
  playButton: {
    position: "absolute",
    top: 8,
    left: 140,
  },
  resetButton: {
    position: "absolute",
    top: 8,
    left: 180,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  dispatchButton: {
    backgroundColor: "#32CD32",
  },
  onAlleyButton: {
    backgroundColor: "#FF6347",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalMenu: {
    width: 200,
    backgroundColor: "white",
    left: 170,
    top: 330,
    borderRadius: 10,
    padding: 10,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalText: {
    fontSize: 16,
    color: "black",
  },
});

export default App;
