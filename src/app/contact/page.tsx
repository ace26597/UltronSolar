import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Ultron Power Systems | Get Free Solar Quote in Dhule",
  description: "Contact Ultron Power Systems for free solar consultation and site survey in Dhule, Jalgaon, and North Maharashtra. Call +91 9422787438.",
  alternates: { canonical: "https://www.ultronsolar.in/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
