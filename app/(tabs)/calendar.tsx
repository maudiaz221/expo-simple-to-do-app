import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodos } from "../../hooks/useTodos";

export default function Calendar() {
  const { todos, loading } = useTodos();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get current month and year
  const currentMonth = selectedDate.toLocaleString("default", { month: "long" });
  const currentYear = selectedDate.getFullYear();

  // Generate calendar days
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const calendarDays = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // Count todos for this date
    const dayTodos = todos.filter((todo) => {
      const todoDate = new Date(todo.createdAt);
      const todoDateStr = `${todoDate.getFullYear()}-${String(
        todoDate.getMonth() + 1
      ).padStart(2, "0")}-${String(todoDate.getDate()).padStart(2, "0")}`;
      return todoDateStr === dateStr;
    });

    calendarDays.push({
      day,
      dateStr,
      todoCount: dayTodos.length,
      completedCount: dayTodos.filter((t) => t.completed).length,
    });
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const handleDayPress = (dateStr: string) => {
    router.push(`/${dateStr}` as any);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading calendar...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color="#2196F3" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <Text style={styles.yearText}>{currentYear}</Text>
        </View>

        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={goToToday} style={styles.todayButton}>
        <Ionicons name="today" size={20} color="#2196F3" />
        <Text style={styles.todayButtonText}>Today</Text>
      </TouchableOpacity>

      <View style={styles.calendar}>
        {/* Day names */}
        <View style={styles.dayNamesRow}>
          {dayNames.map((day) => (
            <View key={day} style={styles.dayNameCell}>
              <Text style={styles.dayNameText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calendarGrid}>
          {calendarDays.map((dayData, index) => {
            if (!dayData) {
              return <View key={index} style={styles.calendarCell} />;
            }

            const isToday =
              dayData.dateStr ===
              `${new Date().getFullYear()}-${String(
                new Date().getMonth() + 1
              ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
                2,
                "0"
              )}`;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.calendarCell,
                  isToday && styles.todayCell,
                  dayData.todoCount > 0 && styles.hasTodosCell,
                ]}
                onPress={() => handleDayPress(dayData.dateStr)}
              >
                <Text
                  style={[
                    styles.dayText,
                    isToday && styles.todayText,
                    dayData.todoCount > 0 && styles.hasTodosText,
                  ]}
                >
                  {dayData.day}
                </Text>
                {dayData.todoCount > 0 && (
                  <View style={styles.todoIndicator}>
                    {dayData.completedCount === dayData.todoCount ? (
                      // All completed - show green dot
                      <View style={[styles.todoDot, styles.allCompletedDot]} />
                    ) : dayData.completedCount > 0 ? (
                      // Partially completed - show both colors
                      <>
                        <View style={styles.todoDot} />
                        <View style={[styles.todoDot, styles.allCompletedDot]} />
                      </>
                    ) : (
                      // None completed - show orange dot
                      <View style={styles.todoDot} />
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  navButton: {
    padding: 8,
  },
  headerContent: {
    alignItems: "center",
  },
  monthText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  yearText: {
    fontSize: 16,
    color: "#666",
  },
  todayButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    gap: 6,
  },
  todayButtonText: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "600",
  },
  calendar: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  dayNamesRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  dayNameCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  calendarCell: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    minHeight: 50,
    paddingVertical: 4,
  },
  todayCell: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
  },
  hasTodosCell: {
    backgroundColor: "#FFF3E0",
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  todayText: {
    color: "#2196F3",
    fontWeight: "bold",
  },
  hasTodosText: {
    fontWeight: "600",
    color: "#FF9800",
  },
  todoIndicator: {
    position: "absolute",
    bottom: 2,
    flexDirection: "row",
    gap: 3,
  },
  todoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF9800",
  },
  allCompletedDot: {
    backgroundColor: "#4CAF50",
  },
});

