export const PRIVACY_LAST_UPDATED = "June 2026";

export const PRIVACY_SECTIONS = [
  {
    title: "Introduction",
    paragraphs: [
      "YouHooAlert (“we,” “us,” or “our”) is a trusted response network and emergency coordination platform. Helping People Help People is our mission — and privacy is central to how we build the product.",
      "This Privacy Policy explains what information we collect, how we use it, who we share it with, and the choices you have. By using the YouHooAlert website or mobile app, you agree to this policy.",
    ],
  },
  {
    title: "Our privacy principles",
    bullets: [
      "Your location is shared only during active alerts with the trusted contacts and safety groups you choose — not 24/7.",
      "We do not sell your personal information.",
      "You control who receives your alerts and who can see your location.",
      "We collect only what we need to operate a reliable emergency coordination service.",
    ],
  },
  {
    title: "Information we collect",
    subsections: [
      {
        heading: "Account information",
        text: "When you create an account, we may collect your name, email address, phone number, profile photo, and sign-in method (such as Google Sign-In).",
      },
      {
        heading: "Trusted contacts and safety groups",
        text: "Information you add about trusted contacts, safety groups, emergency types, and responder preferences — including names, contact details, and group memberships.",
      },
      {
        heading: "Location data",
        text: "When you send an active SOS or emergency alert, we collect your real-time location so your chosen trusted contacts can find you or coordinate help. Location is not collected for always-on tracking when you are not in an active alert.",
      },
      {
        heading: "Alert and response data",
        text: "Emergency type, alert status, timestamps, responder actions (such as “On my way” or “I can help”), and related coordination messages between you and your trusted network.",
      },
      {
        heading: "Device and usage information",
        text: "Device type, operating system, app version, IP address, and basic usage logs needed to deliver alerts reliably, prevent abuse, and improve performance.",
      },
      {
        heading: "Donations",
        text: "If you make an optional donation, payment processing is handled by our payment provider (such as Stripe). We do not store full payment card details on our servers.",
      },
    ],
  },
  {
    title: "How we use your information",
    bullets: [
      "Deliver emergency alerts to the trusted contacts and safety groups you select.",
      "Share your live location only during active alerts with people you authorize.",
      "Enable responder coordination — distance, ETA, and response options.",
      "Operate, maintain, and improve the YouHooAlert platform.",
      "Send service-related notifications (such as alert delivery or account security).",
      "Process optional donations and comply with legal obligations.",
    ],
  },
  {
    title: "Who we share information with",
    paragraphs: [
      "We share your information only as described below. We do not sell personal data to advertisers or data brokers.",
    ],
    subsections: [
      {
        heading: "Trusted contacts you choose",
        text: "When you send an alert, information you authorize — including location and emergency context — is shared with the contacts and safety groups you selected for that alert type.",
      },
      {
        heading: "Service providers",
        text: "We use trusted third-party providers for hosting, messaging, authentication, analytics, and payment processing. They may access data only to perform services on our behalf and under contractual obligations.",
      },
      {
        heading: "Legal requirements",
        text: "We may disclose information if required by law, court order, or to protect the rights, safety, and security of YouHooAlert, our users, or others.",
      },
    ],
  },
  {
    title: "What we do not do",
    bullets: [
      "We do not sell your personal information.",
      "We do not provide always-on family tracking or location monitoring.",
      "We do not share your location with people you have not added to your trusted network for that alert.",
      "We do not use your emergency data for advertising.",
    ],
  },
  {
    title: "Data retention",
    paragraphs: [
      "We retain account and alert-related data for as long as your account is active or as needed to provide the service, comply with legal obligations, resolve disputes, and enforce our agreements.",
      "When you delete your account, we will delete or anonymize your personal information within a reasonable period, except where retention is required by law.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "We use technical and organizational measures designed to protect your information, including encryption in transit and access controls. No method of transmission or storage is 100% secure, but we work continuously to safeguard the platform.",
    ],
  },
  {
    title: "Your choices and rights",
    bullets: [
      "Choose which trusted contacts and safety groups receive each type of alert.",
      "End an active alert to stop live location sharing.",
      "Update or delete your account information in the app settings.",
      "Request access to, correction of, or deletion of your personal data by contacting us.",
      "Opt out of non-essential communications where applicable.",
    ],
    paragraphs: [
      "Depending on where you live, you may have additional rights under applicable privacy laws (such as GDPR or CCPA). Contact us to exercise those rights.",
    ],
  },
  {
    title: "Children's privacy",
    paragraphs: [
      "YouHooAlert is not intended for children under 13 without parental consent. We do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, please contact us and we will take steps to delete it.",
    ],
  },
  {
    title: "International users",
    paragraphs: [
      "YouHooAlert may be used internationally. Your information may be processed in countries other than where you live. We take steps to ensure appropriate safeguards when data is transferred across borders.",
    ],
  },
  {
    title: "Third-party links",
    paragraphs: [
      "Our website may link to third-party sites (such as social media). We are not responsible for the privacy practices of those sites. Review their policies before providing personal information.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. We will post the revised policy on this page and update the “Last updated” date. Continued use of YouHooAlert after changes means you accept the updated policy.",
    ],
  },
  {
    title: "Contact us",
    paragraphs: [
      "Questions about this Privacy Policy or our data practices? Email us at",
    ],
    email: "privacy@youhooalert.com",
  },
] as const;
