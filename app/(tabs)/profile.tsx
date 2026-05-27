import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../lib/auth-context";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nama</Text>
        <Text style={styles.value}>{user?.name}</Text>

        <Text style={styles.label}>Peran</Text>
        <Text style={styles.value}>{user?.role}</Text>

        {user?.nip ? (
          <>
            <Text style={styles.label}>NIP</Text>
            <Text style={styles.value}>{user.nip}</Text>
          </>
        ) : null}

        {user?.username ? (
          <>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{user.username}</Text>
          </>
        ) : null}
      </View>

      <Pressable style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.logoutText}>Keluar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 12,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 17,
    color: "#0f172a",
    marginTop: 4,
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  logoutText: {
    color: "#b91c1c",
    fontSize: 16,
    fontWeight: "700",
  },
});
