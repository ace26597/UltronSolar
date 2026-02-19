import type { Metadata } from "next";
import SubsidyWizardClient from "./SubsidyWizardClient";

export const metadata: Metadata = {
    title: "Subsidy Eligibility Wizard | PM Surya Ghar & KUSUM | Ultron Solar",
    description:
        "Check your eligibility for PM Surya Ghar Muft Bijli Yojana and PM-KUSUM solar subsidy schemes. Answer 4 questions and get your eligibility result instantly.",
    alternates: {
        canonical: "https://www.ultronsolar.in/tools/subsidy-wizard",
    },
    openGraph: {
        title: "Solar Subsidy Eligibility Wizard - Check in 1 Minute",
        description:
            "Check your eligibility for PM Surya Ghar and PM-KUSUM solar subsidy schemes.",
        url: "https://www.ultronsolar.in/tools/subsidy-wizard",
        type: "website",
    },
};

export default function SubsidyWizardPage() {
    return <SubsidyWizardClient />;
}
