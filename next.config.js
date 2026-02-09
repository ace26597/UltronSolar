/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled to allow API routes
  images: {
    // Enable image optimization for better FCP
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  // Enable compression for faster load
  compress: true,
  async redirects() {
    return [
      { source: '/blog/emi_in_solar', destination: '/blog/emi-in-solar', permanent: true },
      { source: '/blog/how_does_solar_system_costs', destination: '/blog/how-does-solar-system-costs', permanent: true },
      { source: '/blog/pm_surya_ghar_subsidy', destination: '/blog/pm-surya-ghar-subsidy', permanent: true },
      { source: '/blog/rooftop_solar_in_dhule', destination: '/blog/rooftop-solar-in-dhule', permanent: true },
      { source: '/blog/solar_for_farmers', destination: '/blog/solar-for-farmers', permanent: true },
      { source: '/blog/solar_in_maharashtra', destination: '/blog/solar-in-maharashtra', permanent: true },
      { source: '/blog/solar_pricing_guide', destination: '/blog/solar-pricing-guide', permanent: true },
      { source: '/blog/solar_simulation_science', destination: '/blog/solar-simulation-science', permanent: true },
      { source: '/blog/subsidy_in_maharashtra', destination: '/blog/subsidy-in-maharashtra', permanent: true },
      { source: '/blog/understanding_electricity_bill', destination: '/blog/understanding-electricity-bill', permanent: true },
    ];
  },
}

module.exports = nextConfig

