import React, { useState } from "react";

export const FooterSubsection = (): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };
  const footerLinks = [
    { text: "Privacy" },
    { text: "Cookies" },
    { text: "Terms" },
  ];

  return (
    <footer className="flex w-full items-center justify-between px-8 py-6 bg-black border-t border-[#d6d7dd] relative">
      {/* Small decorative image */}
      <img
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full object-cover opacity-50 cursor-pointer hover:opacity-70 transition-opacity"
        alt="Footer decoration"
        src="/images/LTQ_0483.jpg"
        onClick={() => handleImageClick("/images/LTQ_0483.jpg")}
      />
      
      <div className="font-small-paragraph font-[number:var(--small-paragraph-font-weight)] text-grey text-[length:var(--small-paragraph-font-size)] text-center tracking-[var(--small-paragraph-letter-spacing)] leading-[var(--small-paragraph-line-height)] [font-style:var(--small-paragraph-font-style)]">
        All rights reserved. 2024
      </div>

      <nav className="flex items-center gap-8">
        {footerLinks.map((link, index) => (
          <div
            key={index}
            className="font-link-text font-[number:var(--link-text-font-weight)] text-grey text-[length:var(--link-text-font-size)] text-center tracking-[var(--link-text-letter-spacing)] leading-[var(--link-text-line-height)] [font-style:var(--link-text-font-style)] cursor-pointer hover:opacity-80 transition-opacity"
          >
            {link.text}
          </div>
        ))}
      </nav>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closePreview}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              alt="Preview"
              src={selectedImage}
            />
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200"
              onClick={closePreview}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
