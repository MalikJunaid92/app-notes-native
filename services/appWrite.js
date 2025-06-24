import Constants from "expo-constants";
import { Platform } from "react-native";
import { Client, Databases } from "react-native-appwrite";

const config = {
  endpoint: Constants.expoConfig.extra.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: Constants.expoConfig.extra.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  db: Constants.expoConfig.extra.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    notes: Constants.expoConfig.extra.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID,
  },
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

if (Platform.OS === "android" || Platform.OS === "ios") {
  client.setPlatform("react-native");
}

const database = new Databases(client);

export { client, config, database };

