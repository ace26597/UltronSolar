import type { Metadata } from "next";
import InstantQuoteClient from "./InstantQuoteClient";

export const metadata: Metadata = {
    title: "Instant Solar Quote | Get Price in 30 Seconds | Ultron Solar",
    description:
        "Get a personalized solar installation quote in 30 seconds. Enter your details, roof type, and preferences for an instant price estimate with subsidy calculation.",
    alternates: {
        canonical: "https://www.ultronsolar.in/tools/instant-quote",
    },
    openGraph: {
        title: "Instant Solar Quote - Price Estimate in 30 Seconds",
        description:
            "Get a personalized solar quote with subsidy calculation in 30 seconds.",
        url: "https://www.ultronsolar.in/tools/instant-quote",
        type: "website",
    },
};

export default function InstantQuotePage() {
    return <InstantQuoteClient />;
}
