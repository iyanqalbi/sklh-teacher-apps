import Constants from "expo-constants";
import { getToken } from "./storage";

function getApiBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const extra = Constants.expoConfig?.extra as { apiUrl?: string } | undefined;
  if (extra?.apiUrl) return extra.apiUrl.replace(/\/$/, "");

  return "https://milbos-daily-hub.vercel.app";
}

type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean;
};

export async function apiFetch(path: string, init: ApiFetchOptions = {}): Promise<Response> {
  const { skipAuth = false, headers, ...rest } = init;
  const nextHeaders = new Headers(headers);
  const url = path.startsWith("http") ? path : `${getApiBaseUrl()}${path}`;

  if (!skipAuth) {
    const token = await getToken();
    if (token) {
      nextHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  if (rest.body && !(rest.body instanceof FormData) && !nextHeaders.has("Content-Type")) {
    nextHeaders.set("Content-Type", "application/json");
  }

  return fetch(url, {
    ...rest,
    headers: nextHeaders,
  });
}

export async function apiJson<T>(path: string, init?: ApiFetchOptions): Promise<T> {
  const response = await apiFetch(path, init);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as { error?: string }).error || "Permintaan gagal");
  }

  return data as T;
}

export function getConfiguredApiBaseUrl(): string {
  return getApiBaseUrl();
}
