import { Poppins } from "next/font/google";

/** Same font setup as digital-cc-b2b-ui */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
