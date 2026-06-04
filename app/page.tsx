import { redirect } from "next/navigation";
import { getSessionId } from "@/lib/session";

export default async function RootPage() {
  const session = await getSessionId();
  redirect(session ? "/home" : "/welcome");
}
