import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Ultron Power Systems | 20+ Years Solar Expertise in Dhule",
  description: "Learn about Ultron Power Systems - Dhule's trusted solar energy provider since 2006. 1000+ installations across North Maharashtra.",
  alternates: { canonical: "https://www.ultronsolar.in/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
