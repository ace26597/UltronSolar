"use client";

export default function YouTubeVideos() {
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

        <div className="flex flex-wrap justify-center gap-6">
          {videos.map((video, index) => {
            const isShort = video.type === "short";
            return (
              <div 
                key={index} 
                className={`bg-gray-50 rounded-lg overflow-hidden shadow-lg ${
                  isShort 
                    ? 'w-full sm:w-80 max-w-sm' // Smaller width for shorts
                    : 'w-full max-w-2xl' // Full width for regular videos
                }`}
              >
                <div 
                  className="relative w-full" 
                  style={{ 
                    paddingBottom: isShort ? "177.78%" : "56.25%" // 9:16 for shorts, 16:9 for videos
                  }}
                >
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
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.youtube.com/@ultronpowersystems"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
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

