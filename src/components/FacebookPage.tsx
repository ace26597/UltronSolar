import React from "react";

export default function FacebookPage() {
  const facebookPageUrl = "https://www.facebook.com/ultronpowersystems";

  return (
    <section id="facebook-timeline" className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-3 sm:mb-4">
            Follow Us on Facebook
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest projects, promotions, and solar energy news
          </p>
        </div>

        <div className="w-full flex justify-center overflow-hidden">
          <div className="w-full max-w-full sm:max-w-[500px] overflow-hidden bg-white rounded-lg shadow-sm min-h-[500px]">
            <iframe
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebookPageUrl)}&tabs=timeline&width=500&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId`}
              width="500"
              height="500"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="w-full h-[500px]"
              title="Ultron Power Systems Facebook Page"
            ></iframe>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors touch-manipulation min-h-[48px] flex items-center justify-center text-sm sm:text-base"
          >
            Visit Our Facebook Page
          </a>
          {/* Dev text hidden for production
          <p className="text-xs text-gray-400 mt-4">
            If the timeline doesn&apos;t load, check the page URL in FacebookPage.tsx
          </p>
          */}
        </div>
      </div>
    </section>
  );
}

