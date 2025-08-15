import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { OptimizedImage } from "../../../../components/OptimizedImage";
import { useGallery } from "../../../../components/GalleryProvider";

export const AboutSubsection = (): JSX.Element => {
  const { openPreview } = useGallery();
  const accordionItems = [
    {
      value: "journey",
      title: "My Journey",
      content:
        "My photography journey began on the bustling streets of London, starting as a hobby and quickly blossoming into a fervent passion.",
      defaultOpen: true,
    },
    {
      value: "philosophy",
      title: "My Philosophy",
      content: "",
      defaultOpen: false,
    },
    {
      value: "accolades",
      title: "Accolades and Experiences",
      content: "",
      defaultOpen: false,
    },
    {
      value: "beyond",
      title: "Beyond the Lens",
      content: "",
      defaultOpen: false,
    },
  ];

  return (
    <section className="flex items-center justify-center gap-[132px] px-[148px] py-[120px] w-full bg-white">
      <div className="flex flex-col items-start gap-[33px] flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 flex-[0_0_auto]">
          <h2 className="w-[448px] mt-[-1.00px] text-4xl font-light text-black tracking-wide leading-tight font-serif">
            Hello! I&#39;m Oliver Bennett
          </h2>

          <p className="w-[448px] text-lg font-light text-black tracking-wide leading-relaxed font-sans">
            A connoisseur of cityscapes and a storyteller through the lens,
            based in the vibrant heart of London. <br />
            <br />
            With over a decade of experience, I have been capturing the essence
            of urban life, one frame at a time.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="journey"
          className="w-[448px]"
        >
          {accordionItems.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="border-t border-[#d6d7dd] border-b-0"
            >
              <AccordionTrigger className="flex justify-between px-0 py-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                <span className="mt-[-1.00px] font-sans font-medium text-black text-base tracking-wide leading-4 whitespace-nowrap">
                  {item.title}
                </span>
              </AccordionTrigger>
              {item.content && (
                <AccordionContent className="pb-4 pt-0">
                  <p className="text-base font-light text-black tracking-wide leading-relaxed font-sans">
                    {item.content}
                  </p>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <OptimizedImage
        src="/images/IMG_1602.JPG"
        alt="About image - Photographer at work"
        className="w-[500px] h-[600px] object-cover rounded-lg shadow-lg"
        onClick={() => openPreview("/images/IMG_1602.JPG")}
        priority={true}
        quality={0.8}
        maxWidth={600}
        maxHeight={800}
      />
    </section>
  );
};
