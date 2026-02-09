import type { Metadata } from "next";
import InstantQuoteClient from "./InstantQuoteClient";

export const metadata: Metadata = {
  title: "Instant Solar Quote | Get Your System Price in 60 Seconds",
  description: "Get a personalized solar rooftop quote in 60 seconds. Enter your details and see recommended system size, price, subsidy, and savings.",
  alternates: { canonical: "https://www.ultronsolar.in/tools/instant-quote" },
};

export default function InstantQuotePage() {
  return <InstantQuoteClient />;
}
