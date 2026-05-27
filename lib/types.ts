export type StaffRole = "GURU" | "MUROBBI" | "KEDUANYA" | "ADMIN";

export type User = {
  id: string;
  name: string;
  role: StaffRole | string;
  nip?: string | null;
  username?: string | null;
  contact?: string | null;
  gender?: string | null;
  status?: string | null;
};

export type LoginResponse = {
  user: User;
  token: string;
  message?: string;
};

export type MeResponse = {
  user: User;
};

export const STAFF_ROLES = new Set(["GURU", "MUROBBI", "KEDUANYA", "ADMIN"]);

export function isTeacherAppRole(role?: string): boolean {
  return !!role && STAFF_ROLES.has(role);
}
