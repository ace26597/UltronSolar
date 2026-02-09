import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Solar Services | Residential, Commercial & Agricultural Solar in Dhule",
  description: "Ultron Power Systems offers complete solar services - rooftop solar, water pumps, EPC solutions for homes, businesses, and farms in North Maharashtra.",
  alternates: { canonical: "https://www.ultronsolar.in/services" },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
