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
        <div className="w-fit z-[3] text-6xl font-light text-black text-center tracking-wide leading-tight relative mt-[-1.00px] font-serif italic">
          Urban stories
          <br />
          through the lens
        </div>

        <img
          className="absolute w-[260px] h-4 top-[122px] left-[239px] z-[2]"
          alt="Header underline"
          src="/icons/Header Underline.png"
        />

        <div className="w-fit z-[1] whitespace-nowrap relative text-xl font-light text-black tracking-wide leading-relaxed font-sans">
          Capturing the unseen rhythms of the city.
        </div>

        <Button className="z-0 bg-yellow hover:bg-yellow/90 text-black h-auto px-8 py-4 rounded-full font-light text-base tracking-wider font-sans transition-all duration-300">
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
