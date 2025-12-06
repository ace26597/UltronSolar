"use client";

import { useState, useEffect } from "react";

export default function YouTubeVideos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  // Add your YouTube video IDs here
  // Extract ID from URL: https://www.youtube.com/watch?v=VIDEO_ID
  // For Shorts: https://www.youtube.com/shorts/VIDEO_ID (same format)
  const videos = [
    {
      id: "WvzA18Vtybg",
      title: "Ultron Power Systems - Solar Energy Solutions",
      type: "video", // regular video
    },
    {
      id: "ftZTqt5dvhg",
      title: "Solar Installation Short",
      type: "short", // YouTube Short
    },
    {
      id: "9qgrF0x1jAM",
      title: "Solar Energy Tips Short",
      type: "short", // YouTube Short
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, videos.length - itemsToShow);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [videos.length, itemsToShow]);

  const maxIndex = Math.max(0, videos.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // Function to get embed URL
  const getEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (videos.length === 0) {
    return null;
  }

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Our Videos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our installation process, customer testimonials, and solar energy solutions
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 sm:px-4"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                    {/* Fixed height container for all videos - responsive */}
                    <div className="relative w-full aspect-video">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={getEmbedUrl(video.id)}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                    {video.title && (
                      <div className="p-4">
                        <h3 className="font-semibold text-navy-dark">{video.title}</h3>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 text-navy-dark z-10 border border-gray-200 hidden md:block"
            aria-label="Previous video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 text-navy-dark z-10 border border-gray-200 hidden md:block"
            aria-label="Next video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Dots Navigation */}
          {maxIndex > 0 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 box-content p-2 ${
                    i === currentIndex ? 'bg-solar-red w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.youtube.com/@ultronpowersystems"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors touch-manipulation min-h-[48px] text-sm sm:text-base"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Visit Our YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
}

