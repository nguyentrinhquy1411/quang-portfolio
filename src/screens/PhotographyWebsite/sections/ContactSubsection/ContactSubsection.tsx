import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";

export const ContactSubsection = (): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };
  const formFields = [
    {
      placeholder: "Full name",
      type: "text",
    },
    {
      placeholder: "Email Address",
      type: "email",
    },
    {
      placeholder: "Phone Number",
      type: "tel",
    },
  ];

  return (
    <section className="flex flex-wrap items-center gap-[0px_132px] px-[148px] py-[120px] bg-black w-full relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-20 hover:opacity-30 transition-opacity"
          alt="Contact background"
          src="/images/expansion_20250810123329927.jpg"
          
        />
      </div>
      
      <div className="gap-6 flex flex-col items-start relative flex-[0_0_auto] z-10">
        <img
          className="w-20 h-20 rounded-full object-cover border-2 border-yellow cursor-pointer hover:opacity-80 transition-opacity"
          alt="Contact profile"
          src="/images/LTQ_0478.jpg"
          
        />

        <h2 className="w-[448px] font-heading-1 font-[number:var(--heading-1-font-weight)] text-smoke-white text-[length:var(--heading-1-font-size)] tracking-[var(--heading-1-letter-spacing)] leading-[var(--heading-1-line-height)] relative mt-[-1.00px] [font-style:var(--heading-1-font-style)]">
          <span className="text-[#fee400] tracking-[var(--heading-1-letter-spacing)] font-heading-1 [font-style:var(--heading-1-font-style)] font-[number:var(--heading-1-font-weight)] leading-[var(--heading-1-line-height)] text-[length:var(--heading-1-font-size)]">
            I&apos;d love
          </span>

          <span className="text-[#f8f8f8] tracking-[var(--heading-1-letter-spacing)] font-heading-1 [font-style:var(--heading-1-font-style)] font-[number:var(--heading-1-font-weight)] leading-[var(--heading-1-line-height)] text-[length:var(--heading-1-font-size)]">
            {" "}
            to hear from you.
          </span>
        </h2>

        <p className="w-[448px] font-paragraph font-[number:var(--paragraph-font-weight)] text-smoke-white text-[length:var(--paragraph-font-size)] tracking-[var(--paragraph-letter-spacing)] leading-[var(--paragraph-line-height)] [font-style:var(--paragraph-font-style)]">
          Whether you&#39;re interested in booking a photoshoot or just want to
          say hello, feel free to drop me a message.
        </p>
      </div>

      <form className="gap-4 mt-5 flex flex-col items-start relative flex-[0_0_auto] z-10">
        {formFields.map((field, index) => (
          <div
            key={index}
            className={`flex items-center gap-[100px] px-6 py-4 relative flex-[0_0_auto] ${index === 0 ? "rounded-[24px_24px_0px_0px]" : ""} overflow-hidden border border-solid border-[#d6d7dd]`}
          >
            <Input
              type={field.type}
              placeholder={field.placeholder}
              className="w-[400px] mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-light text-smoke-white text-[21px] tracking-[-0.63px] leading-6 bg-transparent border-none p-0 h-auto placeholder:text-smoke-white focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <img className="w-4 h-4" alt="Input icon" src="/input-icon.svg" />
          </div>
        ))}

        <div className="flex w-[564px] h-80 items-start gap-2.5 px-6 py-4 relative rounded-[0px_0px_24px_24px] overflow-hidden border border-solid border-[#d6d7dd]">
          <Textarea
            placeholder="Input Field"
            className="w-full h-full mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-light text-smoke-white text-[21px] tracking-[-0.63px] leading-6 bg-transparent border-none p-0 resize-none placeholder:text-smoke-white focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <Button className="flex w-[564px] items-center justify-center gap-2.5 px-6 py-5 relative flex-[0_0_auto] bg-yellow rounded-[48px] h-auto hover:bg-yellow/90">
          <span className="w-fit mt-[-1.00px] font-link-text font-[number:var(--link-text-font-weight)] text-black text-[length:var(--link-text-font-size)] text-center tracking-[var(--link-text-letter-spacing)] leading-[var(--link-text-line-height)] whitespace-nowrap [font-style:var(--link-text-font-style)]">
            Submit
          </span>
        </Button>
      </form>

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
    </section>
  );
};
