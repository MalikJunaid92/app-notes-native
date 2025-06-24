import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
const HeaderLogout = () => {
  const { user, logout } = useAuth();
  return user ? (
    <TouchableOpacity onPress={logout} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null;
};
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ff8c00",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerRight: () => <HeaderLogout />,
          contentStyle: {
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            paddingTop: 10,
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
        <Stack.Screen name="auth" options={{ headerTitle: "Login" }} />
      </Stack>
    </AuthProvider>
  );
}
const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});