export interface Author {
    id: string;
    name: string;
    role: string;
    bio: string;
    avatarUrl: string;
    linkedin?: string;
}

export const authors: Author[] = [
    {
        id: "chandrakant-patil",
        name: "Er. Chandrakant Patil",
        role: "Founder & Chief Engineer",
        bio: "With over 15 years of experience in electrical systems and solar EPC, Er. Patil has led 500+ solar installations across North Maharashtra. He is a recognized expert in grid-connected systems and PM-KUSUM implementation.",
        avatarUrl: "/images/team-patil.jpg",
        linkedin: "https://www.linkedin.com/in/chandrakant-patil-ultron"
    },
    {
        id: "ultron-solar-team",
        name: "Ultron Solar Team",
        role: "Editorial Desk",
        bio: "Our editorial team consists of seasoned solar engineers and policy consultants dedicated to bringing transparent, data-driven energy insights to the people of North Maharashtra.",
        avatarUrl: "/images/logo-icon.png"
    }
];

export function getAuthor(nameOrId: string): Author {
    return authors.find(a => a.id === nameOrId || a.name === nameOrId) || authors[1];
}
