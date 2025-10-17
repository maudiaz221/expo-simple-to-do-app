import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>

        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={120} color="#2196F3" />
        </View>
        
        <Text style={styles.title}>Welcome to the To Do App</Text>
        
        <Text style={styles.subtitle}>
          Stay organized and productive with our simple task management tool
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/todos")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Ionicons name="checkmark-done" size={32} color="#4CAF50" />
            <Text style={styles.featureText}>Track Tasks</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="time" size={32} color="#FF9800" />
            <Text style={styles.featureText}>Stay Focused</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="trophy" size={32} color="#FFD700" />
            <Text style={styles.featureText}>Achieve Goals</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 48,
    lineHeight: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196F3",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 28,
    gap: 8,
    marginBottom: 64,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 16,
  },
  feature: {
    alignItems: "center",
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});
