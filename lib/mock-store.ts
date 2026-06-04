import type { Contact, Emergency, User } from "./types";

const DEFAULT_CONTACTS = [
  { name: "Sarah", phone: "+1 555 010 0001", priority: 1 },
  { name: "James", phone: "+1 555 010 0002", priority: 2 },
  { name: "Mum", phone: "+1 555 010 0003", priority: 3 },
];

type Store = {
  users: Map<string, User>;
  sessions: Map<string, string>;
  contacts: Map<string, Contact>;
  emergencies: Map<string, Emergency>;
  emailToUserId: Map<string, string>;
};

function createStore(): Store {
  return {
    users: new Map(),
    sessions: new Map(),
    contacts: new Map(),
    emergencies: new Map(),
    emailToUserId: new Map(),
  };
}

const globalForStore = globalThis as unknown as { __saStore?: Store };

function getStore(): Store {
  if (!globalForStore.__saStore) {
    globalForStore.__saStore = createStore();
  }
  return globalForStore.__saStore;
}

function id() {
  return crypto.randomUUID();
}

export function createSession(userId: string): string {
  const sessionId = id();
  getStore().sessions.set(sessionId, userId);
  return sessionId;
}

export function getUserIdFromSession(sessionId: string): string | null {
  return getStore().sessions.get(sessionId) ?? null;
}

export function destroySession(sessionId: string) {
  getStore().sessions.delete(sessionId);
}

export function registerUser(data: {
  name: string;
  email: string;
}): User {
  const store = getStore();
  const normalized = data.email.toLowerCase().trim();
  const existingId = store.emailToUserId.get(normalized);
  if (existingId) {
    const existing = store.users.get(existingId);
    if (existing) return existing;
  }

  const user: User = {
    id: id(),
    name: data.name.trim(),
    email: normalized,
    emergencyPhrase: null,
  };
  store.users.set(user.id, user);
  store.emailToUserId.set(normalized, user.id);
  seedContactsForUser(user.id);
  return user;
}

export function loginUser(email: string): User | null {
  const store = getStore();
  const normalized = email.toLowerCase().trim();
  const userId = store.emailToUserId.get(normalized);
  if (!userId) return null;
  return store.users.get(userId) ?? null;
}

export function getUser(userId: string): User | null {
  return getStore().users.get(userId) ?? null;
}

export function updateUser(
  userId: string,
  data: Partial<Pick<User, "name" | "emergencyPhrase">>,
): User | null {
  const user = getStore().users.get(userId);
  if (!user) return null;
  if (data.name !== undefined) user.name = data.name.trim();
  if (data.emergencyPhrase !== undefined) {
    user.emergencyPhrase = data.emergencyPhrase?.trim() || null;
  }
  return user;
}

function seedContactsForUser(userId: string) {
  const store = getStore();
  const hasContacts = [...store.contacts.values()].some((c) => c.userId === userId);
  if (hasContacts) return;

  DEFAULT_CONTACTS.forEach((c) => {
    const contact: Contact = {
      id: id(),
      userId,
      name: c.name,
      phone: c.phone,
      priority: c.priority,
    };
    store.contacts.set(contact.id, contact);
  });
}

export function listContacts(userId: string): Contact[] {
  return [...getStore().contacts.values()]
    .filter((c) => c.userId === userId)
    .sort((a, b) => a.priority - b.priority);
}

export function addContact(
  userId: string,
  data: { name: string; phone: string; priority: number },
): Contact {
  const contact: Contact = {
    id: id(),
    userId,
    name: data.name.trim(),
    phone: data.phone.trim(),
    priority: data.priority,
  };
  getStore().contacts.set(contact.id, contact);
  return contact;
}

export function updateContact(
  userId: string,
  contactId: string,
  data: Partial<Pick<Contact, "priority" | "name" | "phone">>,
): Contact | null {
  const contact = getStore().contacts.get(contactId);
  if (!contact || contact.userId !== userId) return null;
  if (data.priority !== undefined) contact.priority = data.priority;
  if (data.name !== undefined) contact.name = data.name.trim();
  if (data.phone !== undefined) contact.phone = data.phone.trim();
  return contact;
}

export function deleteContact(userId: string, contactId: string): boolean {
  const contact = getStore().contacts.get(contactId);
  if (!contact || contact.userId !== userId) return false;
  getStore().contacts.delete(contactId);
  return true;
}

export function getActiveEmergency(userId: string): Emergency | null {
  for (const e of getStore().emergencies.values()) {
    if (e.userId === userId && e.status === "active") return e;
  }
  return null;
}

export function createEmergency(userId: string): Emergency {
  const store = getStore();
  const existing = getActiveEmergency(userId);
  if (existing) return existing;

  const emergency: Emergency = {
    id: id(),
    userId,
    status: "active",
    startedAt: new Date().toISOString(),
    lat: 51.507 + (Math.random() - 0.5) * 0.02,
    lng: -0.127 + (Math.random() - 0.5) * 0.02,
  };
  store.emergencies.set(emergency.id, emergency);
  return emergency;
}

export function updateEmergency(
  userId: string,
  emergencyId: string,
  data: { status?: Emergency["status"] },
): Emergency | null {
  const emergency = getStore().emergencies.get(emergencyId);
  if (!emergency || emergency.userId !== userId) return null;
  if (data.status) emergency.status = data.status;
  return emergency;
}
