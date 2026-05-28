import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

function isWeb() {
  return Platform.OS === "web";
}

async function getItem(key: string): Promise<string | null> {
  if (isWeb()) {
    return typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
  }
  return SecureStore.getItemAsync(key);
}

async function setItem(key: string, value: string): Promise<void> {
  if (isWeb()) {
    if (typeof localStorage !== "undefined") localStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function removeItem(key: string): Promise<void> {
  if (isWeb()) {
    if (typeof localStorage !== "undefined") localStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export async function getToken(): Promise<string | null> {
  return getItem(TOKEN_KEY);
}

export async function setToken(token: string): Promise<void> {
  await setItem(TOKEN_KEY, token);
}

export async function clearToken(): Promise<void> {
  await removeItem(TOKEN_KEY);
}

export async function getStoredUser<T>(): Promise<T | null> {
  const raw = await getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setStoredUser<T>(user: T): Promise<void> {
  await setItem(USER_KEY, JSON.stringify(user));
}

export async function clearStoredUser(): Promise<void> {
  await removeItem(USER_KEY);
}

export async function clearSession(): Promise<void> {
  await Promise.all([clearToken(), clearStoredUser()]);
}
