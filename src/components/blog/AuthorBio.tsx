import Link from "next/link";
import Image from "next/image";
import { Author } from "@/data/authors";

interface AuthorBioProps {
    author: Author;
}

export default function AuthorBio({ author }: AuthorBioProps) {
    return (
        <div className="mt-16 p-8 md:p-12 bg-brand-bg rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden group hover:border-solar-orange/30 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-solar-orange/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <div className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                    src={author.avatarUrl}
                    alt={author.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h4 className="text-2xl font-black text-navy-dark">{author.name}</h4>
                        <p className="text-solar-orange font-bold uppercase tracking-widest text-xs mt-1">{author.role}</p>
                    </div>
                    {author.linkedin && (
                        <a
                            href={author.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-navy p-2 px-4 rounded-full text-white text-xs font-bold hover:bg-solar-orange transition-colors self-center md:self-auto flex items-center gap-2"
                        >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            LinkedIn Profile
                        </a>
                    )}
                </div>
                <p className="text-gray-600 leading-relaxed text-lg italic">
                    &quot;{author.bio}&quot;
                </p>
            </div>
        </div>
    );
}
