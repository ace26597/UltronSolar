"use client";

import { useEffect, useState } from "react";

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Find all headings within the blog content
        const elements = Array.from(document.querySelectorAll(".blog-content h2, .blog-content h3"));

        // Process headings
        const headingData = elements.map((elem, index) => {
            // Ensure each heading has an ID
            if (!elem.id) {
                elem.id = `section-${index}`;
            }
            return {
                id: elem.id,
                text: elem.textContent || "",
                level: Number(elem.tagName.substring(1)),
            };
        });

        setHeadings(headingData);

        // Scroll spy to highlight active section
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
        );

        elements.forEach((elem) => observer.observe(elem));

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                On this page
            </h4>
            <nav className="flex flex-col space-y-1">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                        className={`text-sm py-1.5 transition-colors duration-200 border-l-2 pl-4 ${activeId === heading.id
                                ? "border-solar-orange text-navy-dark font-semibold"
                                : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900"
                            } ${heading.level === 3 ? "ml-4" : ""}`}
                    >
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
