import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useImageCache } from '../hooks/useImageCache';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  quality?: number; // 0.1 to 1.0
  maxWidth?: number;
  maxHeight?: number;
  hideLoadingIndicator?: boolean; // New prop to hide internal loading
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  onClick,
  priority = false,
  placeholder,
  onLoad,
  onError,
  quality = 0.8,
  maxWidth = 1200,
  maxHeight = 1200,
  hideLoadingIndicator = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [compressedSrc, setCompressedSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { getCachedImage } = useImageCache();

  // Create a compressed version of the image
  const compressImage = useCallback(async (imageSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;
          
          if (width > height) {
            width = Math.min(width, maxWidth);
            height = width / aspectRatio;
          } else {
            height = Math.min(height, maxHeight);
            width = height * aspectRatio;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedUrl = URL.createObjectURL(blob);
              resolve(compressedUrl);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageSrc;
    });
  }, [quality, maxWidth, maxHeight]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px' // Start loading 100px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Load and compress image when in view
  useEffect(() => {
    if (!isInView) return;

    const loadImage = async () => {
      try {
        setIsCompressing(true);
        
        // First try to get from cache
        const cached = await getCachedImage(src);
        
        // If it's the same as original, compress it
        if (cached === src) {
          const compressed = await compressImage(src);
          setCompressedSrc(compressed);
        } else {
          setCompressedSrc(cached);
        }
      } catch (err) {
        console.warn('Failed to process image:', src, err);
        setCompressedSrc(src); // Fallback to original
        setError(true);
      } finally {
        setIsCompressing(false);
      }
    };

    loadImage();
  }, [isInView, src, getCachedImage, compressImage]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  const handleClick = () => {
    if (onClick && isLoaded) {
      onClick();
    }
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {/* Placeholder while loading */}
      {(!isLoaded || isCompressing) && !hideLoadingIndicator && (
        <div className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${className}`}>
          {placeholder ? (
            <img 
              src={placeholder} 
              alt=""
              className="w-full h-full object-cover opacity-30 blur-sm"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              {isCompressing ? (
                <>
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-2"></div>
                </>
              ) : (
                <div className="text-sm">Loading...</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main image */}
      {compressedSrc && (
        <img
          src={compressedSrc}
          alt={alt}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className} ${onClick ? 'cursor-pointer hover:opacity-90 transition-all duration-300' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Error state */}
      {error && !isLoaded && (
        <div className={`absolute inset-0 bg-gray-300 flex items-center justify-center ${className}`}>
          <div className="text-gray-500 text-sm text-center p-4">
            <div>⚠️ Image failed to load</div>
            <div className="text-xs opacity-75 mt-1">{alt}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="text-blue-500 text-xs mt-2 hover:underline"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
