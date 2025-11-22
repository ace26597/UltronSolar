export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    imageUrl: string;
    readTime: string;
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "The Ultimate Guide to Solar Energy: How It Works and Its Benefits",
        slug: "ultimate-guide-to-solar-energy",
        excerpt: "Discover how solar panels convert sunlight into electricity and why switching to solar is the best decision for your wallet and the planet.",
        content: `
      <h2>Introduction to Solar Energy</h2>
      <p>Solar energy is one of the most abundant and clean energy sources available on Earth. Every hour, enough sunlight strikes the earth to provide the entire world's energy needs for a year. Harnessing this power is key to a sustainable future.</p>

      <h2>How Do Solar Panels Work?</h2>
      <p>Solar panels are made up of photovoltaic (PV) cells, which convert sunlight directly into electricity. Here's a simple breakdown of the process:</p>
      <ol>
        <li><strong>Absorption:</strong> Sunlight hits the solar panels, and the PV cells absorb the energy.</li>
        <li><strong>Conversion:</strong> This energy creates electrical charges that move in response to an internal electrical field in the cell, causing electricity to flow.</li>
        <li><strong>Inversion:</strong> The electricity generated is Direct Current (DC). An inverter converts this into Alternating Current (AC), which is used in homes and businesses.</li>
        <li><strong>Usage:</strong> The AC electricity powers your lights, appliances, and other devices.</li>
      </ol>

      <h2>Top Benefits of Going Solar</h2>
      <h3>1. Drastically Reduce Electricity Bills</h3>
      <p>By generating your own electricity, you will buy less from the utility company. This translates to immediate savings on your monthly energy bills.</p>

      <h3>2. Environmentally Friendly</h3>
      <p>Solar energy is a clean, green source of energy. It reduces reliance on fossil fuels and helps lower your carbon footprint, contributing to a healthier planet.</p>

      <h3>3. Low Maintenance Costs</h3>
      <p>Solar energy systems generally require very little maintenance. You only need to keep them relatively clean, so cleaning them a couple of times per year will do the job.</p>

      <h3>4. Increase Property Value</h3>
      <p>Homes equipped with solar energy systems have higher property values and sell more quickly than non-solar homes. Appraisers are increasingly taking solar installations into consideration as they value homes.</p>

      <h2>Conclusion</h2>
      <p>Switching to solar energy is a smart investment for both your finances and the environment. With technology advancing and costs decreasing, there has never been a better time to go solar.</p>
    `,
        author: "Ultron Solar Team",
        date: "November 21, 2025",
        imageUrl: "/images/gallery-project-1.jpg",
        readTime: "5 min read",
        tags: ["Solar Energy", "Renewable Energy", "Cost Savings", "Green Tech"]
    },
    {
        id: "2",
        title: "5 Myths About Solar Energy Debunked",
        slug: "5-myths-about-solar-energy-debunked",
        excerpt: "We separate fact from fiction and debunk common myths about solar power reliability, cost, and maintenance.",
        content: `
      <h2>Myth 1: Solar Panels Don't Work on Cloudy Days</h2>
      <p><strong>Fact:</strong> While solar panels are most effective in direct sunlight, they can still generate electricity on cloudy days. They use diffuse sunlight to produce power, ensuring your home stays powered even when the weather isn't perfect.</p>

      <h2>Myth 2: Solar Energy is Too Expensive</h2>
      <p><strong>Fact:</strong> The cost of solar panels has dropped significantly over the last decade. Additionally, government incentives and tax credits make going solar more affordable than ever. The long-term savings on electricity bills often outweigh the initial investment.</p>

      <h2>Myth 3: Solar Panels Require High Maintenance</h2>
      <p><strong>Fact:</strong> Solar panels are incredibly durable and require very little maintenance. They have no moving parts, which means there's less wear and tear. A simple cleaning a few times a year is usually sufficient.</p>

      <h2>Myth 4: Solar Panels Will Damage My Roof</h2>
      <p><strong>Fact:</strong> When installed correctly by professionals, solar panels actually protect the portion of the roof they cover from elements like rain, snow, and debris.</p>

      <h2>Myth 5: I Will Still Have Power During a Blackout</h2>
      <p><strong>Fact:</strong> Most standard grid-tied solar systems will shut down during a power outage for safety reasons. However, if you have a battery storage system, you can keep your essential appliances running even when the grid goes down.</p>
    `,
        author: "Ultron Solar Team",
        date: "November 15, 2025",
        imageUrl: "/images/gallery-project-2.jpg",
        readTime: "4 min read",
        tags: ["Myths", "Solar Facts", "Education"]
    }
];
