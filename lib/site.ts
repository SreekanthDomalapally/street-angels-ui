export const SITE_URL = "https://youhooalert.com";

export const TAGLINE = "HELPING PEOPLE HELP PEOPLE";

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#mission", label: "Mission" },
  { href: "#early-access", label: "Early Access" },
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Build Your Trusted Network",
    description:
      "Add the people you trust and organize them into safety groups — family, friends, travel companions, and more.",
    icon: "network",
  },
  {
    step: 2,
    title: "Choose Who Matters",
    description:
      "Assign contacts to Family, Friends, Travel, Medical, Work, or Emergency groups. Different situations, different people.",
    icon: "groups",
  },
  {
    step: 3,
    title: "Get Help When Needed",
    description:
      "Send an SOS with the right emergency type. Trusted contacts receive your location and coordinate real-world assistance.",
    icon: "help",
  },
] as const;

export const HERO_CONTACTS = [
  { name: "Priya", status: "On my way — 8 min", tone: "coral" as const },
  { name: "Arjun", status: "I can help", tone: "green" as const },
  { name: "Mom", status: "Calling you now", tone: "blue" as const },
] as const;

export const FEATURES = [
  {
    title: "Trusted Contacts",
    description: "Add the people you trust — not everyone, just the ones who matter when it counts.",
    icon: "contacts",
  },
  {
    title: "Safety Groups",
    description: "Organize contacts into Family, Friends, Travel, Medical, Work, and custom groups.",
    icon: "group",
  },
  {
    title: "Emergency Types",
    description: "Medical, personal safety, pickup, breakdown, lost — each alert reaches the right people.",
    icon: "sos",
  },
  {
    title: "Live Location",
    description: "Share your real-time location only during active alerts with the contacts you choose.",
    icon: "map",
  },
  {
    title: "Real-Time Responses",
    description: "See who can help, who is on the way, and who has your back — instantly.",
    icon: "pulse",
  },
  {
    title: "Responder Skills",
    description: "Contacts can share what they can offer — first aid, driving, translation, and more.",
    icon: "skills",
  },
  {
    title: "Smart Emergency Routing",
    description: "The right emergency type notifies the right group automatically. No guesswork.",
    icon: "route",
  },
  {
    title: "Privacy First",
    description: "Your location is shared only during active alerts. No always-on tracking. Ever.",
    icon: "shield",
  },
  {
    title: "Community Driven",
    description: "Built by people who believe safety should be shared, not sold.",
    icon: "heart",
  },
  {
    title: "No Subscription Required",
    description: "Every safety feature is free. No premium tiers. No paywalls on peace of mind.",
    icon: "free",
  },
] as const;

export const WHY_DIFFERENT = {
  traditional: [
  { label: "Tracking", detail: "Always watching where you are" },
  { label: "Monitoring", detail: "Passive location awareness" },
  { label: "Visibility", detail: "Knowing your location on a map" },
  { label: "Individual", detail: "One person checking in on you" },
  ],
  youhoo: [
  { label: "Helping", detail: "Coordinating real-world assistance" },
  { label: "Responding", detail: "Active help from trusted people" },
  { label: "Coordination", detail: "Multiple people working together" },
  { label: "Network", detail: "A trusted response network around you" },
  ],
} as const;

export const EMERGENCY_TYPES = [
  {
    title: "Medical Help",
    description: "Notify your Medical group. Contacts with first-aid skills are prioritized.",
    icon: "medical",
  },
  {
    title: "Personal Safety",
    description: "Alert Family or Emergency Contacts when you feel unsafe or threatened.",
    icon: "safety",
  },
  {
    title: "Need Pickup",
    description: "Let your Friends or Night Out group know you need a safe ride home.",
    icon: "pickup",
  },
  {
    title: "Car Breakdown",
    description: "Reach your Work or Family group with your exact location on the road.",
    icon: "breakdown",
  },
  {
    title: "Lost or Stranded",
    description: "Share live location with Travel or Friends so someone can find you.",
    icon: "lost",
  },
  {
    title: "General Help",
    description: "Not sure what type? Send a general alert to your default trusted group.",
    icon: "help",
  },
  {
    title: "Custom Alerts",
    description: "Create your own emergency types and route them to the groups you choose.",
    icon: "custom",
  },
] as const;

export const SAFETY_GROUPS = [
  { name: "Family", description: "Parents, siblings, partners — your closest circle." },
  { name: "Friends", description: "The people you'd call first in a pinch." },
  { name: "Travel", description: "Companions and contacts when you're away from home." },
  { name: "Medical", description: "Contacts with medical knowledge or nearby healthcare access." },
  { name: "Work", description: "Colleagues who know your commute and schedule." },
  { name: "Night Out", description: "Friends who know where you are when you're out late." },
  { name: "Emergency Contacts", description: "Your go-to people for any urgent situation." },
  { name: "Custom Groups", description: "Neighborhood watch, university, volunteer — build your own." },
] as const;

export const RESPONDER_OPTIONS = [
  { label: "I Can Help", description: "Let them know you're available and ready." },
  { label: "On My Way", description: "Share your ETA so they know help is coming." },
  { label: "Call User", description: "Reach out directly to check in or get details." },
  { label: "Call Emergency Services", description: "Escalate to professional help when needed." },
  { label: "Cannot Help", description: "Honest responses help others coordinate faster." },
] as const;

export const USE_CASES = [
  {
    title: "Walking Home Alone",
    description:
      "It's late. You're on a quiet street. One tap alerts your Night Out group with your live location — and someone responds within minutes.",
    audience: "Students & individuals",
  },
  {
    title: "Medical Emergency",
    description:
      "You need help fast. Your Medical group is notified instantly, with contacts who have first-aid skills highlighted first.",
    audience: "Families & elderly care",
  },
  {
    title: "Car Breakdown",
    description:
      "Stranded on the highway. Your location goes to your Family or Work group so someone can find you — or send roadside help.",
    audience: "Commuters & travelers",
  },
  {
    title: "Need a Safe Ride Home",
    description:
      "Your ride fell through. Alert your Friends group with a Need Pickup request. Someone nearby can come get you.",
    audience: "Students & night-out safety",
  },
  {
    title: "Traveling Alone",
    description:
      "In an unfamiliar city and something feels off. Your Travel group sees your live location and coordinates help from afar.",
    audience: "Solo travelers",
  },
  {
    title: "Elderly Family Member",
    description:
      "Mom lives alone. She has a trusted network ready — and you see when she needs help, not where she is every minute.",
    audience: "Families & caregivers",
  },
  {
    title: "University Student Safety",
    description:
      "Campus safety groups keep students connected. Roommates, RAs, and friends respond when someone sends an alert.",
    audience: "Universities & schools",
  },
  {
    title: "Community Safety Group",
    description:
      "Neighborhood watch, volunteer responders, or local groups — coordinate help across your community when it matters.",
    audience: "Community organizations",
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "How is YouHooAlert different from Life360?",
    a: "Life360 is built for location tracking — knowing where family members are at all times. YouHooAlert is built for emergency coordination — connecting you to trusted people who can actually help when something goes wrong. We share your location only during active alerts, not 24/7.",
  },
  {
    q: "Who receives my alerts?",
    a: "Only the trusted contacts and safety groups you choose for each emergency type. You control exactly who sees your alerts and location — nothing is shared without your action.",
  },
  {
    q: "Can I create multiple safety groups?",
    a: "Yes. Create as many groups as you need — Family, Friends, Travel, Medical, Work, Night Out, Emergency Contacts, or fully custom groups for your community.",
  },
  {
    q: "Can contacts belong to multiple groups?",
    a: "Absolutely. Your partner can be in Family and Emergency Contacts. A friend can be in Friends and Night Out. Groups are flexible — people aren't locked into one role.",
  },
  {
    q: "How does live location work?",
    a: "Your location is shared only when you send an active alert. Trusted contacts see your real-time position on a map so they can find you or coordinate help. When the alert ends, location sharing stops.",
  },
  {
    q: "Do I need a subscription?",
    a: "No. YouHooAlert is completely free. Every safety feature is available to everyone. We believe peace of mind should never be behind a paywall.",
  },
  {
    q: "Can I use YouHooAlert internationally?",
    a: "Yes. YouHooAlert works wherever you have internet access. Build trusted networks for home, travel, and anywhere life takes you.",
  },
  {
    q: "How do donations help?",
    a: "Optional donations support server infrastructure, emergency alert delivery reliability, and keeping the platform free and accessible for everyone who needs it.",
  },
] as const;

export const DONATION_AMOUNTS = [2, 5, 10] as const;
