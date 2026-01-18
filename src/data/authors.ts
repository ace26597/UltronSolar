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
        id: "ultron-solar-team",
        name: "Ultron Solar Team",
        role: "Editorial Desk",
        bio: "Our editorial team consists of seasoned solar engineers and policy consultants dedicated to bringing transparent, data-driven energy insights to the people of North Maharashtra.",
        avatarUrl: "/images/logo-icon.png"
    }
];

export function getAuthor(nameOrId: string): Author {
    return authors.find(a => a.id === nameOrId || a.name === nameOrId) || authors[0];
}
