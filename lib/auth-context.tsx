import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { apiJson } from "./api-client";
import { clearSession, getStoredUser, getToken, setStoredUser, setToken } from "./storage";
import { isTeacherAppRole, type LoginResponse, type MeResponse, type User } from "./types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { username?: string; nip?: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    await clearSession();
    setUser(null);
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await getToken();
      const savedUser = await getStoredUser<User>();

      if (!token || !savedUser) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiJson<MeResponse>("/api/me");
        if (!isTeacherAppRole(data.user.role)) {
          await clearSession();
          setUser(null);
          return;
        }
        setUser(data.user);
        await setStoredUser(data.user);
      } catch {
        await clearSession();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = useCallback(async (credentials: { username?: string; nip?: string; password: string }) => {
    const data = await apiJson<LoginResponse>("/api/login", {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(credentials),
    });

    if (!isTeacherAppRole(data.user.role)) {
      throw new Error("Aplikasi ini hanya untuk guru dan murobbi");
    }

    await setToken(data.token);
    await setStoredUser(data.user);
    setUser(data.user);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
