"use client";

import { useState } from "react";
import {
    FaTwitter,
    FaLinkedinIn,
    FaWhatsapp,
    FaLink,
    FaCheck
} from "react-icons/fa";

interface ShareButtonsProps {
    title: string;
    url?: string; // Optional, defaults to current window.location
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const getUrl = () => {
        if (typeof window !== "undefined") {
            return url || window.location.href;
        }
        return "";
    };

    const shareUrl = getUrl();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link", err);
        }
    };

    if (!shareUrl) return null;

    return (
        <div className="flex flex-row md:flex-col items-center gap-3">
            <p className="hidden md:block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 transform -rotate-90 md:rotate-0 whitespace-nowrap">
                Share
            </p>

            <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300"
                aria-label="Share on Twitter"
            >
                <FaTwitter size={16} />
            </a>

            <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                aria-label="Share on LinkedIn"
            >
                <FaLinkedinIn size={16} />
            </a>

            <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#25D366] hover:text-white transition-all duration-300"
                aria-label="Share on WhatsApp"
            >
                <FaWhatsapp size={16} />
            </a>

            <button
                onClick={handleCopy}
                className={`p-2 rounded-full transition-all duration-300 ${copied
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-white"
                    }`}
                aria-label="Copy Link"
            >
                {copied ? <FaCheck size={16} /> : <FaLink size={16} />}
            </button>
        </div>
    );
}
