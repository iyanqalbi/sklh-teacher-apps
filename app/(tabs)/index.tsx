import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../lib/auth-context";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Assalamu&apos;alaikum,</Text>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.role}>Peran: {user?.role}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fase 1 selesai</Text>
        <Text style={styles.cardBody}>
          Login, session, dan navigasi dasar sudah aktif. Penilaian Direct Scan akan dibuat di Fase 2.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
  },
  greeting: {
    fontSize: 16,
    color: "#64748b",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 4,
  },
  role: {
    fontSize: 14,
    color: "#0f766e",
    marginTop: 8,
    fontWeight: "600",
  },
  card: {
    marginTop: 24,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: "#475569",
  },
});
