import { Platform } from "react-native";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

let db: ReturnType<typeof drizzle> | null = null;

// Initialize and get database instance
export async function getDatabase() {
  if (db) {
    return db;
  }

  try {
    const dbName = "todos.db";
    const sqliteDb = await SQLite.openDatabaseAsync(dbName);
    
    // Create table if it doesn't exist
    await sqliteDb.execAsync(`
      CREATE TABLE IF NOT EXISTS todos (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL,
        text TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL
      );
    `);
    
    db = drizzle(sqliteDb);
    return db;
  } catch (error) {
    console.error("Database initialization error:", error);
    // For web, if SQLite fails, we could fall back to AsyncStorage or IndexedDB
    // For now, throw the error to see what's happening
    throw error;
  }
}

