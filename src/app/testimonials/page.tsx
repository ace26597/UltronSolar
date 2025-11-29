import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Customer Reviews | Ultron Power Systems Dhule",
    description: "See what our happy customers say about our solar installation services in Dhule, Jalgaon, and Nandurbar.",
};

export default function TestimonialsPage() {
    const testimonials = [
        {
            id: 1,
            name: "Rajesh Patil",
            role: "Farmer, Sakri",
            content: "The solar water pump installed by Ultron Power Systems has changed my farming. Now I don't worry about load shedding. Excellent service!",
            rating: 5,
        },
        {
            id: 2,
            name: "Dr. Sanjay Sharma",
            role: "Hospital Owner, Dhule",
            content: "We installed a 20kW rooftop system for our hospital. The electricity bill has gone down by 80%. Highly recommended team.",
            rating: 5,
        },
        {
            id: 3,
            name: "Amit Deshmukh",
            role: "Homeowner, Deopur",
            content: "Very professional installation. They handled all the subsidy paperwork. I got the subsidy amount in my account within 2 months.",
            rating: 5,
        },
        {
            id: 4,
            name: "Priya Mahajan",
            role: "School Principal, Shirpur",
            content: "Great experience with Ultron Solar. The team is knowledgeable and supportive. The system is working perfectly for our school.",
            rating: 4,
        },
        {
            id: 5,
            name: "Vijay Choudhary",
            role: "Factory Owner, MIDC",
            content: "Best solar EPC company in Dhule. They completed the 50kW project on time and with great quality.",
            rating: 5,
        },
        {
            id: 6,
            name: "Sunil Wagh",
            role: "Farmer, Sindkheda",
            content: "Kusum Yojana benefit was explained well. I got the pump at a very low cost. Thank you Ultron team.",
            rating: 5,
        },
    ];

    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Header */}
            <section className="bg-navy-dark text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Stories</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Real stories from our satisfied customers across North Maharashtra.
                    </p>
                </div>
            </section>

            <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
                                </div >
                            </div >
                        ))
}
                    </div >
                </div >
            </section >

    {/* CTA Section */ }
    < section className = "bg-energy-green py-16 text-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join 500+ Happy Customers</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
                Experience the power of the sun with Ultron Power Systems.
            </p>
            <Link
                href="/#contact"
                className="inline-block bg-white text-energy-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
                Start Your Solar Journey
            </Link>
        </div>
            </section >
        </main >
    );
}
