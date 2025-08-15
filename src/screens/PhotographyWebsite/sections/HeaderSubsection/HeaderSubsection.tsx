import { useGallery } from "../../../../components/GalleryProvider";
import { OptimizedImage } from "../../../../components/OptimizedImage";
import { Button } from "../../../../components/ui/button";

export const HeaderSubsection = (): JSX.Element => {
  const { openPreview } = useGallery();

  const featuredImages = [
    "/images/LTQ_0396(1).jpg",
    "/images/expansion_20250810123329927.jpg", 
    "/images/LTQ_0481.jpg"
  ];
  return (
    <header className="flex flex-col items-center gap-[72px] pt-[120px] pb-0 px-8 w-full bg-white">
      <div className="flex flex-col h-60 items-center justify-between relative">
        <div className="w-fit z-[3] font-heading-1 font-[number:var(--heading-1-font-weight)] text-black text-[length:var(--heading-1-font-size)] text-center tracking-[var(--heading-1-letter-spacing)] leading-[var(--heading-1-line-height)] relative mt-[-1.00px] [font-style:var(--heading-1-font-style)]">
          Urban stories
          <br />
          through the lens
        </div>

        <img
          className="absolute w-[260px] h-4 top-[122px] left-[239px] z-[2]"
          alt="Header underline"
          src="/icons/Header Underline.png"
        />

        <div className="w-fit z-[1] whitespace-nowrap relative font-paragraph font-[number:var(--paragraph-font-weight)] text-black text-[length:var(--paragraph-font-size)] tracking-[var(--paragraph-letter-spacing)] leading-[var(--paragraph-line-height)] [font-style:var(--paragraph-font-style)]">
          Capturing the unseen rhythms of the city.
        </div>

        <Button className="z-0 bg-yellow hover:bg-yellow/90 text-black h-auto px-6 py-3 rounded-[48px] font-link-text font-[number:var(--link-text-font-weight)] text-[length:var(--link-text-font-size)] tracking-[var(--link-text-letter-spacing)] leading-[var(--link-text-line-height)] [font-style:var(--link-text-font-style)]">
          Discover my Journey
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-6xl">
        {featuredImages.map((imageSrc, index) => (
          <OptimizedImage
            key={index}
            src={imageSrc}
            alt="Featured Photography Work"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            onClick={() => openPreview(imageSrc)}
            priority={index === 0} // Prioritize first image
            quality={0.85} // High quality for hero images
            maxWidth={800} // Optimize for display size
            maxHeight={600}
          />
        ))}
      </div>
    </header>
  );
};
