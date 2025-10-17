import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodos } from "../../hooks/useTodos";

export default function DateDetail() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const { todos, loading, toggleTodo, deleteTodo, refresh } = useTodos();
  const [inputText, setInputText] = useState("");

  // Parse the date from the route parameter (avoid timezone issues)
  const dateStr = date;
  const [year, month, day] = dateStr.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day);

  // Filter todos for this specific date (avoid timezone issues)
  const dayTodos = todos.filter((todo) => {
    const todoDate = new Date(todo.createdAt);
    const todoYear = todoDate.getFullYear();
    const todoMonth = todoDate.getMonth() + 1;
    const todoDay = todoDate.getDate();
    const todoDateStr = `${todoYear}-${String(todoMonth).padStart(2, "0")}-${String(todoDay).padStart(2, "0")}`;
    return todoDateStr === dateStr;
  });

  const completedCount = dayTodos.filter((todo) => todo.completed).length;

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddTodo = async () => {
    if (inputText.trim()) {
      try {
        // Create a todo with the selected date (avoid timezone issues)
        const [year, month, day] = dateStr.split('-').map(Number);
        const todoDate = new Date(year, month - 1, day);
        
        // Add to database
        const { getDatabase } = await import("../../db");
        const { todos: todosTable } = await import("../../db/schema");
        const { getDeviceId } = await import("../../utils/deviceId");
        
        const db = await getDatabase();
        const deviceId = await getDeviceId();
        
        await db.insert(todosTable).values({
          id: Date.now().toString(),
          userId: deviceId,
          text: inputText.trim(),
          completed: false,
          createdAt: todoDate,
        });
        
        // Clear input
        setInputText("");
        
        // Refresh the todos list
        await refresh();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#2196F3" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.dateText}>{formatDate(dateStr)}</Text>
            <Text style={styles.subtitle}>
              {completedCount} of {dayTodos.length} completed
            </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a task for this day..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleAddTodo}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
            <Ionicons name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={dayTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleTodo(item.id)}
              >
                <Ionicons
                  name={item.completed ? "checkbox" : "square-outline"}
                  size={24}
                  color={item.completed ? "#4CAF50" : "#999"}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.todoTextCompleted,
                ]}
              >
                {item.text}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTodo(item.id)}
              >
                <Ionicons name="trash-outline" size={22} color="#f44336" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={64} color="#ddd" />
              <Text style={styles.emptyText}>No tasks for this day</Text>
              <Text style={styles.emptySubtext}>Add a task to get started!</Text>
            </View>
          }
          contentContainerStyle={
            dayTodos.length === 0 && styles.emptyList
          }
        />
      </KeyboardAvoidingView>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    gap: 8,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
    fontSize: 16,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#999",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 4,
  },
});

