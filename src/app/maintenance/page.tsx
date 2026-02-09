import type { Metadata } from "next";
import MaintenanceClient from "./MaintenanceClient";

export const metadata: Metadata = {
  title: "Solar Maintenance & AMC | Ultron Power Systems Dhule",
  description: "Professional solar panel cleaning, health checkups, repair and Annual Maintenance Contracts (AMC) in Dhule and North Maharashtra.",
  alternates: { canonical: "https://www.ultronsolar.in/maintenance" },
};

export default function MaintenancePage() {
  return <MaintenanceClient />;
}
