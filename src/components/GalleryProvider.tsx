import React, { createContext, useContext, useEffect, useState } from 'react';
import { useImageCache } from '../hooks/useImageCache';
import { ImagePreviewModal } from './ImagePreviewModal';

interface GalleryContextType {
  selectedImage: string | null;
  openPreview: (src: string) => void;
  closePreview: () => void;
  preloadImages: (sources: string[]) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};

interface GalleryProviderProps {
  children: React.ReactNode;
}

export const GalleryProvider: React.FC<GalleryProviderProps> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { preloadImages } = useImageCache();

  const openPreview = (src: string) => {
    setSelectedImage(src);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };

  const handlePreloadImages = (sources: string[]) => {
    preloadImages(sources);
  };

  // Preload images strategically - critical images first
  useEffect(() => {
    const criticalImages = [
      "/images/LTQ_0431.jpg", // Profile image (always visible)
      "/images/LTQ_0396(1).jpg", // Header hero images
      "/images/expansion_20250810123329927.jpg",
      "/images/LTQ_0481.jpg"
    ];

    const galleryImages = [
      "/images/LTQ_0396.jpg",
      "/images/IMG_1444.JPG", 
      "/images/IMG_1602.JPG",
      "/images/LTQ_0409.jpg",
      "/images/IMG_1668.JPG",
      "/images/LTQ_0432.jpg",
      "/images/LTQ_0478.jpg",
      "/images/LTQ_0483.jpg"
    ];

    // Load critical images immediately
    handlePreloadImages(criticalImages);

    // Load gallery images after initial page load
    const galleryTimer = setTimeout(() => {
      handlePreloadImages(galleryImages);
    }, 3000); // Wait 3 seconds before loading gallery

    return () => clearTimeout(galleryTimer);
  }, []);

  const value: GalleryContextType = {
    selectedImage,
    openPreview,
    closePreview,
    preloadImages: handlePreloadImages
  };

  return (
    <GalleryContext.Provider value={value}>
      {children}
      <ImagePreviewModal 
        src={selectedImage} 
        onClose={closePreview}
      />
    </GalleryContext.Provider>
  );
};
