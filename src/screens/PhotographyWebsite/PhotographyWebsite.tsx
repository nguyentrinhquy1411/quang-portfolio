import { AboutSubsection } from "./sections/AboutSubsection";
import { ContactSubsection } from "./sections/ContactSubsection/ContactSubsection";
import { FooterSubsection } from "./sections/FooterSubsection/FooterSubsection";
import { GallerySubsection } from "./sections/GallerySubsection/GallerySubsection";
import { HeaderSubsection } from "./sections/HeaderSubsection";
import { NavigationSubsection } from "./sections/NavigationSubsection/NavigationSubsection";
import { GalleryProvider } from "../../components/GalleryProvider";

export const PhotographyWebsite = (): JSX.Element => {
  return (
    <GalleryProvider>
      <div className="bg-smoke-white w-full min-h-screen">
        <div className="w-full mx-auto">
          <NavigationSubsection />
          <HeaderSubsection />
          <AboutSubsection />
          <GallerySubsection />
          <ContactSubsection />
          <FooterSubsection />
        </div>
      </div>
    </GalleryProvider>
  );
};
