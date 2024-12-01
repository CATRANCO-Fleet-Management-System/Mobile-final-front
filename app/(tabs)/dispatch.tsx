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
import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import Sidebar from "../components/sidebar";
import DispatchModal from "../components/DispatchModal";
import AlleyModal from "../components/AlleyModal";
import echo from "../../services/utils/pusherConfig"; //
import { useFocusEffect } from "@react-navigation/native";

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
  const [selectedBus, setSelectedBus] = useState(null);
  const [timer, setTimer] = useState(600); // 10 minutes default (in seconds)
  const [isRunning, setIsRunning] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // To toggle visibility of components
  const [intervalType, setIntervalTypeState] = useState<"normal" | "rush">("normal");
  const [trackerData, setTrackerData] = useState<any>(null);
  const [path, setPath] = useState<{ latitude: number; longitude: number }[]>(
    []
  );

  // useFocusEffect to manage listener setup
  useFocusEffect(
    React.useCallback(() => {
      setupRealTimeListener(); // Call the listener setup function
    }, [])
  );

  // Function to setup real-time listener
  const setupRealTimeListener = () => {
    const channel = echo.channel("flespi-data");

    const handleEvent = (event: any) => {
      console.log("Real-time Data Received:", event.data);
      if (Array.isArray(event.data) && event.data.length > 0) {
        const newTrackerData = event.data[0];

        // Update path if valid data is received
        if (newTrackerData.PositionLatitude && newTrackerData.PositionLongitude) {
          setPath((prevPath) => [
            ...prevPath,
            {
              latitude: newTrackerData.PositionLatitude,
              longitude: newTrackerData.PositionLongitude,
            },
          ]);
        }

        setTrackerData(newTrackerData); // Update state with the first object
      } else {
        setTrackerData(null); // Clear state if no valid data
      }
    };

    channel.listen("FlespiDataReceived", handleEvent);

    // Return cleanup function
    return () => {
      channel.stopListening("FlespiDataReceived");
      echo.disconnect();
    };
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

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev); // Toggle visibility of busPage, timerContainer, and bottomButtons
  };

  const resetTimer = () => {
    setTimer(intervalType === "normal" ? 600 : 300); // Reset based on interval type
  };

  const setIntervalType = (type: "normal" | "rush") => {
    setIntervalTypeState(type);
    setTimer(type === "normal" ? 600 : 300); // Update timer based on selected interval type
    setMenuVisible(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      {/* Map with Real-Time Marker and Polyline */}
      <MapView
        style={styles.map}
        key={`${trackerData?.PositionLatitude}-${trackerData?.PositionLongitude}`}
        region={{
          latitude: trackerData?.PositionLatitude,
          longitude: trackerData?.PositionLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Polyline for the trail */}
        <Polyline
          coordinates={path}
          strokeWidth={3}
          strokeColor="blue"
        />

        {/* Marker for the current position */}
        {trackerData && (
          <Marker
            coordinate={{
              latitude: trackerData.PositionLatitude,
              longitude: trackerData.PositionLongitude,
            }}
            title="Tracker"
            description={`Speed: ${trackerData.PositionSpeed} km/h`}
          />
        )}
      </MapView>

      {/* Sidebar */}
      <Sidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

      {/* Header */}
      <View style={styles.header}>
        {!isHidden && ( // Conditionally render the menu icon and date
          <>
            <TouchableOpacity onPress={() => setSidebarVisible(!sidebarVisible)}>
              <Icon name="menu" size={25} color="black" />
            </TouchableOpacity>
            <Text style={styles.date}>{currentDate}</Text>
          </>
        )}
        <TouchableOpacity onPress={toggleVisibility} style={styles.eyeIcon}>
          <Icon name={isHidden ? "eye-outline" : "eye-off-outline"} size={25} color="black" />
        </TouchableOpacity>
      </View>

      {/* Free Space */}
      <View style={styles.freeSpace} />

      {/* Conditionally Render Components */}
      {!isHidden && (
        <>
          {/* Swipeable Bus Status */}
          <FlatList
            data={allBusData}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
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
                      onPress={() => setSelectedBus({ bus: item.bus, status: item.status })}
                    >
                      <Icon name="bus" size={20} color="black" />
                      <View style={{ flex: 1, flexDirection: "column" }}>
                        <Text style={styles.busText}>{item.bus}</Text>
                        <Text style={styles.statusText}>{item.status}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          />

          {/* Timer */}
          <View style={styles.timerContainer}>
            <TouchableOpacity onPress={() => setIsRunning(!isRunning)} style={styles.playButton}>
              <Icon
                name={isRunning ? "pause-outline" : "play-outline"}
                size={30}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={resetTimer} style={styles.resetButton}>
              <Icon name="refresh-outline" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.timer}>{formatTime(timer)}</Text>
            <Text style={styles.timerLabel}>for next dispatch</Text>
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={styles.settingsIcon}
            >
              <Icon name="settings-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>

          {/* Bottom Buttons */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={[styles.button, styles.dispatchButton]}
              onPress={() => setDispatchModalVisible(true)}
            >
              <Text style={styles.buttonText}>Dispatch</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.onAlleyButton]}
              onPress={() => setAlleyModalVisible(true)}
            >
              <Text style={styles.buttonText}>On Alley</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Dispatch Modal */}
      <DispatchModal
        isVisible={dispatchModalVisible}
        onClose={() => setDispatchModalVisible(false)}
        selectedBus={selectedBus}
        onConfirm={resetTimer}
      />

      {/* Alley Modal */}
      <AlleyModal
        isVisible={alleyModalVisible}
        onClose={() => setAlleyModalVisible(false)}
        selectedBus={selectedBus}
        onConfirm={resetTimer}
      />

      {/* Settings Modal */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
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
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    position: "relative", 
  },
  date: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1, 
  },
  eyeIcon: {
    position: "absolute",
    right: 10, 
    top: 10, 
  },
  map: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  freeSpace: {
    height: 390,
  },
  busPage: {
    width: Dimensions.get("window").width - 20,
    height: 245
  },
  busCard: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedBusCard: {
    borderWidth: 2,
    borderColor: "orange",
  },
  busText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "700",
  },
  statusText: {
    marginLeft: 10,
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
  },
  timerContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  timer: {
    fontSize: 40,
    fontWeight: "bold",
  },
  timerLabel: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
  },
  settingsIcon: {
    position: "absolute",
    top: 17,
    left: 80,
    padding: 5,
    borderRadius: 50,
    backgroundColor: "#f7f7f7",
  },
  playButton: {
    position: "absolute",
    top: 17,
    right: 80,
    padding: 5,
    borderRadius: 50,
    backgroundColor: "#f7f7f7",
  },
  resetButton: {
    position: "absolute",
    top: 17,
    right: 30,
    padding: 5,
    borderRadius: 50,
    backgroundColor: "#f7f7f7",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
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
  // Settings Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalMenu: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});

export default App;