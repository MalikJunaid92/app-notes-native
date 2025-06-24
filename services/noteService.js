import Constants from "expo-constants";
import { ID } from "react-native-appwrite";
import databaseService from "./databaseService";
const dbId = Constants.expoConfig?.extra?.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = Constants.expoConfig?.extra?.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  // get notes
  async getNotes() {
    const response = await databaseService.listDocuments(dbId, colId);
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  // add notes
  async addNote(text) {
    if (!text) {
      return { error: "Note text cannot be empty." };
    }
    const data = {
      text: text,
      createdAt: new Date().toISOString(),
    };
    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique()
    );
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  // update note
  async updateNote(id, text) {
    const response = await databaseService.updateDocument(dbId, colId, id, {
      text,
    });
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },
  // delete note
  async deleteNote(noteId) {
    if (!noteId) {
      return { error: "Note ID cannot be empty." };
    }
    const response = await databaseService.deleteDocument(dbId, colId, noteId);
    if (response?.error) {
      return { error: response.error };
    }
    return { success: true };
  },
};

export default noteService;

{
  /*
project name junaid
project id junaid01
react native platforn Junaid Android
react native platforn package name junaid-android
const EXPO_PUBLIC_APPWRITE_PROJECT_ID = "junaid01";
const EXPO_PUBLIC_APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
database name junaid
database id junaid01
collection name junaid
collection id junaid */
}
