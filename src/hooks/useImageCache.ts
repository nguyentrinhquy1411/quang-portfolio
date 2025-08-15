import { useState, useCallback } from 'react';

interface ImageCacheEntry {
  src: string;
  blob: Blob;
  objectUrl: string;
  timestamp: number;
  compressed?: boolean;
  originalSize?: number;
  compressedSize?: number;
}

class ImageCache {
  private cache = new Map<string, ImageCacheEntry>();
  private readonly maxSize = 30; // Reduced from 50 due to large images
  private readonly maxAge = 20 * 60 * 1000; // Reduced to 20 minutes

  async get(src: string): Promise<string> {
    const cached = this.cache.get(src);
    
    // Check if cached and not expired
    if (cached && Date.now() - cached.timestamp < this.maxAge) {
      return cached.objectUrl;
    }

    // Remove expired entry
    if (cached) {
      URL.revokeObjectURL(cached.objectUrl);
      this.cache.delete(src);
    }

    // Fetch and cache new image with compression
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const originalSize = blob.size;

      // If image is larger than 2MB, we'll let OptimizedImage handle compression
      if (originalSize > 2 * 1024 * 1024) {
        console.log(`Large image detected (${(originalSize / 1024 / 1024).toFixed(1)}MB): ${src}`);
        return src; // Return original src to be compressed by OptimizedImage
      }

      const objectUrl = URL.createObjectURL(blob);
      
      const entry: ImageCacheEntry = {
        src,
        blob,
        objectUrl,
        timestamp: Date.now(),
        originalSize
      };

      // Clean cache if too large
      if (this.cache.size >= this.maxSize) {
        this.cleanup();
      }

      this.cache.set(src, entry);
      return objectUrl;
    } catch (error) {
      console.warn('Failed to cache image:', src, error);
      return src; // Fallback to original src
    }
  }

  private cleanup() {
    const entries = Array.from(this.cache.entries());
    // Sort by timestamp and remove oldest entries
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    const toRemove = entries.slice(0, Math.floor(this.maxSize / 2));
    toRemove.forEach(([src, entry]) => {
      URL.revokeObjectURL(entry.objectUrl);
      this.cache.delete(src);
    });
    
    console.log(`Cleaned up ${toRemove.length} cached images`);
  }

  clear() {
    this.cache.forEach(entry => {
      URL.revokeObjectURL(entry.objectUrl);
    });
    this.cache.clear();
    console.log('Image cache cleared');
  }

  preload(sources: string[], maxConcurrent: number = 3) {
    // Limit concurrent preloads to prevent overwhelming the browser
    const chunks = [];
    for (let i = 0; i < sources.length; i += maxConcurrent) {
      chunks.push(sources.slice(i, i + maxConcurrent));
    }

    chunks.reduce(async (promise, chunk) => {
      await promise;
      await Promise.all(
        chunk.map(src => {
          if (!this.cache.has(src)) {
            return this.get(src).catch(error => {
              console.warn('Failed to preload image:', src, error);
            });
          }
          return Promise.resolve();
        })
      );
    }, Promise.resolve());
  }

  getCacheStats() {
    const stats = {
      totalImages: this.cache.size,
      totalSize: 0,
      averageSize: 0,
      compressed: 0
    };

    this.cache.forEach(entry => {
      stats.totalSize += entry.originalSize || 0;
      if (entry.compressed) stats.compressed++;
    });

    stats.averageSize = stats.totalImages > 0 ? stats.totalSize / stats.totalImages : 0;
    
    return stats;
  }
}

const imageCache = new ImageCache();

export const useImageCache = () => {
  const [cachedImages, setCachedImages] = useState<Map<string, string>>(new Map());

  const getCachedImage = useCallback(async (src: string): Promise<string> => {
    if (cachedImages.has(src)) {
      return cachedImages.get(src)!;
    }

    const cachedSrc = await imageCache.get(src);
    setCachedImages(prev => new Map(prev).set(src, cachedSrc));
    return cachedSrc;
  }, [cachedImages]);

  const preloadImages = useCallback((sources: string[]) => {
    // Prioritize smaller, critical images first
    const prioritySources = sources.slice(0, 5); // First 5 images
    const backgroundSources = sources.slice(5);

    // Load priority images immediately
    imageCache.preload(prioritySources, 2);
    
    // Load background images after a delay
    setTimeout(() => {
      imageCache.preload(backgroundSources, 1);
    }, 2000);
    
    // Update state for preloaded images
    sources.forEach(async (src) => {
      if (!cachedImages.has(src)) {
        try {
          const cachedSrc = await imageCache.get(src);
          setCachedImages(prev => new Map(prev).set(src, cachedSrc));
        } catch (error) {
          console.warn('Failed to preload image:', src, error);
        }
      }
    });
  }, [cachedImages]);

  const clearCache = useCallback(() => {
    imageCache.clear();
    setCachedImages(new Map());
  }, []);

  const getCacheStats = useCallback(() => {
    return imageCache.getCacheStats();
  }, []);

  return {
    getCachedImage,
    preloadImages,
    clearCache,
    getCacheStats,
    cachedImages
  };
};

export default imageCache;
