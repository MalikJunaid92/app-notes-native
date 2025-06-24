import { ID } from "react-native-appwrite";
import { account } from "./appWrite";

const authService = {
  // Register a new user
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      error.message = error.message || "Registration failed. Please try again.";
    }
  },
  // Login a user
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      error.message =
        error.message || "Login failed. Please check your credentials.";
    }
  },
  //   get logged-in user
  async getUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return null;
    }
  },
  // Logout the user
  async logout() {
    try {
      await account.deleteSession("current");
      return true;
    } catch (error) {
      error.message = error.message || "Logout failed. Please try again.";
      return false;
    }
  },
};
export default authService;
