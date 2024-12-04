import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Table, TableWrapper, Row, Rows } from "react-native-reanimated-table";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import RNHTMLtoPDF from "react-native-html-to-pdf";

const History = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false); // State for showing calendar

  // Sample records (3 random records)
  const records = [
    {
      date: "2024-12-01",
      busNumber: 1,
      action: "Dispatch",
      time: "08:00 AM",
      routeFrom: "Silver Creek",
      routeTo: "Cogon",
    },
    {
      date: "2024-12-02",
      busNumber: 2,
      action: "Alley",
      time: "09:15 AM",
      routeFrom: "Cogon",
      routeTo: "Canitoan",
    },
    {
      date: "2024-12-03",
      busNumber: 3,
      action: "Dispatch",
      time: "10:30 AM",
      routeFrom: "Canitoan",
      routeTo: "Silver Creek",
    },
    {
      date: "2024-12-04",
      busNumber: 4,
      action: "Dispatch",
      time: "07:45 AM",
      routeFrom: "Cogon",
      routeTo: "Canitoan",
    },
    {
      date: "2024-12-05",
      busNumber: 5,
      action: "Alley",
      time: "11:00 AM",
      routeFrom: "Canitoan",
      routeTo: "Silver Creek",
    },
    {
      date: "2024-12-06",
      busNumber: 6,
      action: "Dispatch",
      time: "02:30 PM",
      routeFrom: "Silver Creek",
      routeTo: "Cogon",
    },
    {
      date: "2024-12-07",
      busNumber: 7,
      action: "Dispatch",
      time: "03:00 PM",
      routeFrom: "Cogon",
      routeTo: "Canitoan",
    },
    {
      date: "2024-12-08",
      busNumber: 8,
      action: "Alley",
      time: "09:30 AM",
      routeFrom: "Canitoan",
      routeTo: "Silver Creek",
    },
    {
      date: "2024-12-09",
      busNumber: 9,
      action: "Dispatch",
      time: "01:00 PM",
      routeFrom: "Silver Creek",
      routeTo: "Cogon",
    },
    {
      date: "2024-12-10",
      busNumber: 10,
      action: "Alley",
      time: "12:45 PM",
      routeFrom: "Cogon",
      routeTo: "Canitoan",
    },
    {
      date: "2024-12-11",
      busNumber: 11,
      action: "Dispatch",
      time: "05:00 PM",
      routeFrom: "Canitoan",
      routeTo: "Silver Creek",
    },
    {
      date: "2024-12-12",
      busNumber: 12,
      action: "Dispatch",
      time: "07:00 AM",
      routeFrom: "Silver Creek",
      routeTo: "Cogon",
    },
    {
      date: "2024-12-13",
      busNumber: 1,
      action: "Alley",
      time: "09:00 AM",
      routeFrom: "Cogon",
      routeTo: "Canitoan",
    },
    // More records...
  ];

  // Table data mapping
  const tableData = records.map((record) => [
    record.date,
    record.busNumber,
    record.action,
    record.time,
    record.routeFrom,
    record.routeTo,
  ]);

  // Table header
  const tableHead = [
    "Date",
    "Bus No.",
    "Action",
    "Time",
    "Route From",
    "Route To",
  ];

  // Handle Date Selection
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false); // Close the calendar after selection
  };

  // Handle Print (PDF Generation)
  const handlePrint = async () => {
    try {
      const htmlContent = `
        <h1>Dispatch History</h1>
        <table border="1" style="width:100%">
          <tr>
            <th>Date</th>
            <th>Bus No.</th>
            <th>Action</th>
            <th>Time</th>
            <th>Route From</th>
            <th>Route To</th>
          </tr>
          ${tableData
            .map(
              (row) => `
            <tr>
              <td>${row[0]}</td>
              <td>${row[1]}</td>
              <td>${row[2]}</td>
              <td>${row[3]}</td>
              <td>${row[4]}</td>
              <td>${row[5]}</td>
            </tr>
          `
            )
            .join("")}
        </table>
      `;

      const options = {
        html: htmlContent,
        fileName: "dispatch_history",
        directory: "Documents",
      };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert("PDF Created", `Your PDF file is saved at ${file.filePath}`);
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dispatch History</Text>
        <TouchableOpacity style={styles.iconButton} onPress={handlePrint}>
          <Icon name="print" size={28} color="#333" />
        </TouchableOpacity>

        {/* Calendar icon button */}
        <TouchableOpacity
          style={styles.calendarIcon}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Icon name="calendar" size={23} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.tableContainer}>
        <Table borderStyle={{ borderWidth: 0 }}>
          <Row
            data={tableHead}
            style={styles.headerRow}
            textStyle={styles.headerText}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={tableData}
              textStyle={styles.rowText}
              style={styles.row}
            />
          </TableWrapper>
        </Table>
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarModal}>
            <Calendar
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: "blue" },
              }}
              onDayPress={onDayPress}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    position: "relative",
  },
  title: {
    fontSize: 28, // Increased font size
    fontWeight: "bold", // Bold header text
    textAlign: "center",
    color: "#333",
    flex: 1, // Center the title
  },
  iconButton: {
    position: "absolute",
    right: 10,
    top: 8,
    marginRight: 0, // Adjust margin between icons
  },
  calendarIcon: {
    position: "absolute",
    right: 45, // Position calendar icon further left from the print icon
    top: 10, // Align it with the top
  },
  tableContainer: {
    marginTop: 10,
  },
  headerRow: {
    height: 60, // Increased height for header row
    backgroundColor: "#f1f5eb",
  },
  wrapper: {
    marginTop: 5,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 14,
    fontWeight: 500,
    textAlign: "center",
    padding: 10,
  },
  rowText: {
    fontSize: 12,
    textAlign: "center",
    padding: 5,
  },
  calendarContainer: {
    marginTop: 20,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for the modal
  },
  calendarModal: {
    width: 300,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2, // Border width for the modal container
    borderColor: "#ccc", // Light gray border color
    shadowColor: "#000", // Optional: shadow for elevation on iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default History;
