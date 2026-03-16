import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const getPlacePhoto = async (query) => {

  console.log("Searching image for:", query);

  try {
    if (!query) return null;

    // simplify the query (remove words like hotel, resort etc)
    const cleanQuery = query.split(" ").slice(0,2).join(" ");

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

    console.log("Unsplash result:", res.data);

    return res.data.results[0]?.urls?.regular || null;

  } catch (error) {
    console.log("Unsplash error:", error);
    return null;
  }
};