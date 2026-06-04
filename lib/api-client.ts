import type {
  ActiveEmergencyResponse,
  ApiError,
  AuthMeResponse,
  Contact,
  ContactsResponse,
  Emergency,
  User,
} from "./types";

async function parseJson<T>(res: Response): Promise<T> {
  return res.json() as Promise<T>;
}

export async function apiRegister(data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await parseJson<ApiError>(res);
    throw new Error(err.error || "Registration failed");
  }
  return parseJson<User>(res);
}

export async function apiLogin(data: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await parseJson<ApiError>(res);
    throw new Error(err.error || "Login failed");
  }
  return parseJson<User>(res);
}

export async function apiLogout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function apiMe(): Promise<AuthMeResponse | null> {
  const res = await fetch("/api/auth/me");
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to load user");
  return parseJson<AuthMeResponse>(res);
}

export async function apiUpdateProfile(data: {
  name: string;
  emergencyPhrase: string | null;
}): Promise<User> {
  const res = await fetch("/api/users/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return parseJson<User>(res);
}

export async function apiContacts(): Promise<ContactsResponse> {
  const res = await fetch("/api/contacts");
  if (!res.ok) throw new Error("Failed to load contacts");
  return parseJson<ContactsResponse>(res);
}

export async function apiAddContact(data: {
  name: string;
  phone: string;
  priority: number;
}): Promise<Contact> {
  const res = await fetch("/api/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add contact");
  return parseJson<Contact>(res);
}

export async function apiUpdateContact(
  id: string,
  data: { priority?: number; name?: string; phone?: string },
): Promise<Contact> {
  const res = await fetch(`/api/contacts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update contact");
  return parseJson<Contact>(res);
}

export async function apiDeleteContact(id: string): Promise<void> {
  const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete contact");
}

export async function apiCreateEmergency(): Promise<Emergency> {
  const res = await fetch("/api/emergencies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error("Failed to create emergency");
  return parseJson<Emergency>(res);
}

export async function apiActiveEmergency(): Promise<ActiveEmergencyResponse> {
  const res = await fetch("/api/emergencies/active");
  if (res.status === 401) return { emergency: null };
  if (!res.ok) throw new Error("Failed to load emergency");
  return parseJson<ActiveEmergencyResponse>(res);
}

export async function apiResolveEmergency(id: string): Promise<Emergency> {
  const res = await fetch(`/api/emergencies/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "resolved" }),
  });
  if (!res.ok) throw new Error("Failed to end emergency");
  return parseJson<Emergency>(res);
}
