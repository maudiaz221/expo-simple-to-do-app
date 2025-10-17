import * as SecureStore from "expo-secure-store";

const DEVICE_ID_KEY = "device_id";

export async function getDeviceId(): Promise<string> {
  try {
    // Try to get existing device ID
    let deviceId = await SecureStore.getItemAsync(DEVICE_ID_KEY);
    
    if (!deviceId) {
      // Generate a new unique ID if one doesn't exist
      deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId);
    }
    
    return deviceId;
  } catch (error) {
    // Fallback if SecureStore is not available
    console.warn("SecureStore not available, using fallback ID");
    return `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

