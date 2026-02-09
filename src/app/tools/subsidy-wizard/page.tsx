import type { Metadata } from "next";
import SubsidyWizardClient from "./SubsidyWizardClient";

export const metadata: Metadata = {
  title: "PM Surya Ghar Subsidy Checker | Check Your Solar Subsidy Eligibility",
  description: "Check your eligibility for PM Surya Ghar Muft Bijli Yojana and PM-KUSUM solar subsidy schemes. Free eligibility check in 4 questions.",
  alternates: { canonical: "https://www.ultronsolar.in/tools/subsidy-wizard" },
};

export default function SubsidyWizardPage() {
  return <SubsidyWizardClient />;
}
