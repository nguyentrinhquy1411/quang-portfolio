import React, { useEffect, useState } from 'react';
import { OptimizedImage } from './OptimizedImage';

interface ImagePreviewModalProps {
  src: string | null;
  onClose: () => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  src,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (src) {
      setIsVisible(true);
      setIsLoading(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [src]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 150); // Delay to allow animation
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    console.log('Preview image loaded');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    if (src) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [src]);

  if (!src) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50 ${
        isVisible ? 'bg-opacity-75' : 'bg-opacity-0 pointer-events-none'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`relative max-w-4xl max-h-full p-4 transition-transform duration-300 ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg z-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-3 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
            </div>
          </div>
        )}

        <OptimizedImage
          src={src}
          alt="Preview"
          className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          priority={true}
          onLoad={handleImageLoad}
        />
        
        <button
          className="absolute top-2 right-2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 text-xl font-bold shadow-lg"
          onClick={handleClose}
          aria-label="Close preview"
        >
          ×
        </button>
      </div>
    </div>
  );
};
