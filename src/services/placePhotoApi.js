import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Simple in-memory cache for images
const imageCache = new Map();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const getPlacePhoto = async (query) => {
  try {
    if (!query) return null;

    // Check cache first
    const cached = imageCache.get(query);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.url;
    }

    // simplify the query (remove words like hotel, resort etc)
    const cleanQuery = query.split(" ").slice(0, 2).join(" ");

    const res = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: cleanQuery,
          per_page: 1,
          client_id: UNSPLASH_KEY
        }
      }
    );

    const imageUrl = res.data.results[0]?.urls?.regular || null;
    
    // Cache the result
    if (imageUrl) {
      imageCache.set(query, { url: imageUrl, timestamp: Date.now() });
    }

    return imageUrl;

  } catch (error) {
    return null;
  }
};