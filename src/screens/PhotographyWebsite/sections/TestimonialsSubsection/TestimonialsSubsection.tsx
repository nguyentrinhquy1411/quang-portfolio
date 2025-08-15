import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const TestimonialsSubsection = (): JSX.Element => {
  const testimonials = [
    {
      quote:
        "Oliver's unique eye for urban landscapes has brought our campaign to life. His ability to capture the soul of the city is unparalleled.",
      name: "Emily Clark,",
      title: "Marketing Director - Cityscape Magazine",
      titleClass: "text-[#222021] tracking-[-0.08px]",
      image: "/images/IMG_1444.JPG",
    },
    {
      quote:
        "I hired Oliver for a personal photoshoot, and he exceeded all expectations. His work is not just photography; it's storytelling at its finest.",
      name: "Liam Thompson,",
      title: "Entrepreneur",
      titleClass: "font-light",
      image: "/images/LTQ_0432.jpg",
    },
    {
      quote:
        "Oliver's workshop opened my eyes to the beauty of urban photography. His guidance and techniques were invaluable. A true master of his craft!",
      name: "Sarah Jenkins,",
      title: "Aspiring Photographer",
      titleClass: "font-normal",
      image: "/images/IMG_1668.JPG",
    },
  ];

  const paginationDots = [
    { active: false },
    { active: true },
    { active: false },
    { active: false },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-10 px-8 py-[120px] w-full bg-white">
      <div className="flex items-center justify-between w-full max-w-[1248px]">
        <div className="flex items-center gap-6">
          <h2 className="text-center whitespace-nowrap font-heading-2 font-[number:var(--heading-2-font-weight)] text-black text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
            Testimonial
          </h2>

          <img
            className="w-11 h-[22px]"
            alt="Smiley face"
            src="/smiley-face.svg"
          />
        </div>

        <div className="flex items-center gap-2">
          {paginationDots.map((dot, index) => (
            <div
              key={index}
              className={`w-4 h-4 border-2 border-solid border-[#222021] ${
                dot.active ? "bg-yellow" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-start gap-4">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="border-2 border-solid border-[#222021] bg-transparent"
          >
            <CardContent className="flex flex-col items-start gap-10 p-6">
              <img
                className="w-16 h-16 rounded-full object-cover"
                alt={`${testimonial.name} profile`}
                src={testimonial.image}
              />
              
              <blockquote className="w-[400px] font-quote-text font-[number:var(--quote-text-font-weight)] text-black text-[length:var(--quote-text-font-size)] tracking-[var(--quote-text-letter-spacing)] leading-[var(--quote-text-line-height)] [font-style:var(--quote-text-font-style)]">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex flex-col items-start gap-1">
                <div className="w-[400px] font-heading-3 font-[number:var(--heading-3-font-weight)] text-black text-[length:var(--heading-3-font-size)] tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] [font-style:var(--heading-3-font-style)]">
                  {testimonial.name}
                </div>

                <div
                  className={`w-[400px] [font-family:'Montserrat',Helvetica] text-black text-base tracking-[-0.48px] leading-[22.4px] ${testimonial.titleClass}`}
                >
                  {testimonial.title}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
