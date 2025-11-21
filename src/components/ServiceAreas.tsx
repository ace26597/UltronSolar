import Image from "next/image";

export default function ServiceAreas() {
  return (
    <section className="py-12 bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-solar-gold">
          Serving North Maharashtra
        </h2>
        <p className="text-gray-300 text-lg">
          Dhule • Jalgaon • Nashik • Nandurbar • Sakri • Shirpur • Dondaicha • Malegaon
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Available for projects in nearby villages & industrial areas
        </p>
      </div>
    </section>
  );
}

