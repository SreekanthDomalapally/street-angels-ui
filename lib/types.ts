export type User = {
  id: string;
  name: string;
  email: string;
  emergencyPhrase: string | null;
};

export type Contact = {
  id: string;
  userId: string;
  name: string;
  phone: string;
  priority: number;
};

export type EmergencyStatus = "active" | "resolved" | "cancelled";

export type Emergency = {
  id: string;
  userId: string;
  status: EmergencyStatus;
  startedAt: string;
  lat: number;
  lng: number;
};

export type AuthMeResponse = User;

export type ContactsResponse = Contact[];

export type ActiveEmergencyResponse = {
  emergency: Emergency | null;
};

export type ApiError = {
  error: string;
};
