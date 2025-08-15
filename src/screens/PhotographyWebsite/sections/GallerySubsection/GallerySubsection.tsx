import React from "react";
import { OptimizedImage } from "../../../../components/OptimizedImage";
import { useGallery } from "../../../../components/GalleryProvider";

export const GallerySubsection = (): JSX.Element => {
  const { openPreview } = useGallery();
  
  const galleryImages = [
    {
      src: "/images/LTQ_0396.jpg",
      alt: "Professional Photography",
      width: "w-[912px]",
      height: "h-[646px]",
      hasOverlay: true,
      overlayPosition: "top-[540px] left-0",
      title: "Professional Portrait",
      description: "Captured with professional lighting.\nCanon EOS",
    },
    {
      src: "/images/IMG_1444.JPG",
      alt: "Creative Photography",
      width: "w-[448px]",
      height: "h-[646px]",
      hasOverlay: false,
    },
    {
      src: "/images/IMG_1602.JPG",
      alt: "Artistic Shot",
      width: "w-[448px]",
      height: "h-80",
      hasOverlay: false,
    },
    {
      src: "/images/LTQ_0409.jpg",
      alt: "Natural Light Photography",
      width: "w-[448px]",
      height: "h-[646px]",
      hasOverlay: true,
      overlayPosition: "top-[540px] left-0",
      title: "Natural Light",
      description: "Captured with natural lighting.\nProfessional lens",
    },
    {
      src: "/images/IMG_1668.JPG",
      alt: "Creative Composition",
      width: "w-[448px]",
      height: "h-60",
      hasOverlay: false,
    },
    {
      src: "/images/LTQ_0431.jpg",
      alt: "Professional Photography",
      width: "w-[912px]",
      height: "h-[646px]",
      hasOverlay: true,
      overlayPosition: "top-[540px] left-[717px]",
      title: "Studio Photography",
      description: "Professional studio setup.\nHigh-end equipment",
    },
    {
      src: "/images/LTQ_0432.jpg",
      alt: "Artistic Photography",
      width: "w-[448px]",
      height: "h-80",
      hasOverlay: false,
    },
    {
      src: "/images/LTQ_0478.jpg",
      alt: "Creative Shot",
      width: "w-[448px]",
      height: "h-60",
      hasOverlay: false,
    },
    {
      src: "/images/LTQ_0481.jpg",
      alt: "Professional Work",
      width: "w-[448px]",
      height: "h-60",
      hasOverlay: false,
    },
    {
      src: "/images/LTQ_0483.jpg",
      alt: "Artistic Vision",
      width: "w-[448px]",
      height: "h-80",
      hasOverlay: false,
    },
  ];

  return (
    <section className="flex flex-col items-center gap-10 px-8 py-[120px] w-full">
      <h2 className="w-fit whitespace-nowrap relative mt-[-1.00px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-black text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
        Some of my latest shots
      </h2>

      <div className="flex flex-wrap w-[1376px] items-end gap-[16px_16px] relative flex-[0_0_auto]">
        <div className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
          <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
            <div className="relative">
              <OptimizedImage
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="relative w-[912px] h-[646px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openPreview(galleryImages[0].src)}
                quality={0.85}
               
              />
              {galleryImages[0].hasOverlay && (
                <div
                  className={`inline-flex flex-col items-start gap-2 p-6 absolute ${galleryImages[0].overlayPosition} bg-black`}
                >
                  <h3 className="w-fit font-heading-3 font-[number:var(--heading-3-font-weight)] text-smoke-white text-[length:var(--heading-3-font-size)] tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] whitespace-nowrap relative mt-[-1.00px] [font-style:var(--heading-3-font-style)]">
                    {galleryImages[0].title}
                  </h3>
                  <p className="relative w-fit font-caption font-[number:var(--caption-font-weight)] text-smoke-white text-[length:var(--caption-font-size)] tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] [font-style:var(--caption-font-style)]">
                    {galleryImages[0].description
                      ?.split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          {index <
                            galleryImages[0].description!.split("\n").length -
                              1 && <br />}
                        </React.Fragment>
                      ))}
                  </p>
                </div>
              )}
            </div>
          </div>

          <OptimizedImage
            src={galleryImages[1].src}
            alt={galleryImages[1].alt}
            className="relative w-[448px] h-[646px] cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openPreview(galleryImages[1].src)}
            quality={0.85}
            maxWidth={500}
            maxHeight={700}
          />
        </div>

        <div className="flex-col inline-flex items-start gap-4 relative flex-[0_0_auto]">
          <OptimizedImage
            src={galleryImages[2].src}
            alt={galleryImages[2].alt}
            className="relative w-[448px] h-80 object-cover cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openPreview(galleryImages[2].src)}
            quality={0.85}
           
          />

          <div className="inline-flex items-start gap-2.5 relative flex-[0_0_auto]">
            <div className="relative">
              <OptimizedImage
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                className="relative w-[448px] h-[646px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openPreview(galleryImages[3].src)}
                quality={0.85}
              
              />
              {galleryImages[3].hasOverlay && (
                <div
                  className={`inline-flex flex-col items-start gap-2 p-6 absolute ${galleryImages[3].overlayPosition} bg-black`}
                >
                  <h3 className="w-fit font-heading-3 font-[number:var(--heading-3-font-weight)] text-smoke-white text-[length:var(--heading-3-font-size)] tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] whitespace-nowrap relative mt-[-1.00px] [font-style:var(--heading-3-font-style)]">
                    {galleryImages[3].title}
                  </h3>
                  <p className="relative w-fit font-caption font-[number:var(--caption-font-weight)] text-smoke-white text-[length:var(--caption-font-size)] tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] [font-style:var(--caption-font-style)]">
                    {galleryImages[3].description
                      ?.split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          {index <
                            galleryImages[3].description!.split("\n").length -
                              1 && <br />}
                        </React.Fragment>
                      ))}
                  </p>
                </div>
              )}
            </div>
          </div>

          <OptimizedImage
            src={galleryImages[4].src}
            alt={galleryImages[4].alt}
            className="relative w-[448px] h-60 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openPreview(galleryImages[4].src)}
            quality={0.85}
          
          />
        </div>

        <div className="flex flex-wrap w-[912px] items-end gap-[16px_16px] relative">
          <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
            <div className="relative">
              <OptimizedImage
                src={galleryImages[5].src}
                alt={galleryImages[5].alt}
                className="relative w-[912px] h-[646px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openPreview(galleryImages[5].src)}
                quality={0.85}
              
              />
              {galleryImages[5].hasOverlay && (
                <div
                  className={`inline-flex flex-col items-start gap-2 p-6 absolute ${galleryImages[5].overlayPosition} bg-black`}
                >
                  <h3 className="w-fit font-heading-3 font-[number:var(--heading-3-font-weight)] text-smoke-white text-[length:var(--heading-3-font-size)] tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] whitespace-nowrap relative mt-[-1.00px] [font-style:var(--heading-3-font-style)]">
                    {galleryImages[5].title}
                  </h3>
                  <p className="relative w-fit font-caption font-[number:var(--caption-font-weight)] text-smoke-white text-[length:var(--caption-font-size)] tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] [font-style:var(--caption-font-style)]">
                    {galleryImages[5].description
                      ?.split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          {index <
                            galleryImages[5].description!.split("\n").length -
                              1 && <br />}
                        </React.Fragment>
                      ))}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
            <OptimizedImage
              src={galleryImages[6].src}
              alt={galleryImages[6].alt}
              className="relative w-[448px] h-80 object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openPreview(galleryImages[6].src)}
              quality={0.85}
            />

            <OptimizedImage
              src={galleryImages[7].src}
              alt={galleryImages[7].alt}
              className="relative w-[448px] h-60 object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openPreview(galleryImages[7].src)}
              quality={0.85}
            />
          </div>

          <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
            <OptimizedImage
              src={galleryImages[8].src}
              alt={galleryImages[8].alt}
              className="relative w-[448px] h-60 object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openPreview(galleryImages[8].src)}
              quality={0.85}

            />

            <OptimizedImage
              src={galleryImages[9].src}
              alt={galleryImages[9].alt}
              className="relative w-[448px] h-80 object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openPreview(galleryImages[9].src)}
              quality={0.85}

            />
          </div>
        </div>
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-12">
        <a
          href="https://drive.google.com/drive/folders/1bh2e6ucOx8ZHe4GIvw0DUERwGMVnvZuk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white font-medium text-sm hover:bg-gray-800 transition-colors duration-300 rounded-lg"
        >
          <span>See More Photos</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </section>
  );
};
