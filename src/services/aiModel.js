import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a travel plan for Location: New York for 2 days for a couple traveler on economy budget. Return the result strictly as a single JSON object using camelCase keys, the travel plan with a trip note and must feature hotelsOptions array, each hotel with hotelName, hotelAddress, priceRange, imageUrl, ratimg, description, and a coordinate alongside an itinerary array of daily plans. Each day must include a dayNumber, theme, and an activities array, where each activity contains activityName, description, imageUrl, ticketPrice, timeRange, tiemToTravel and coordinates.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: JSON.stringify({
            tripNote:
              "This 2-day itinerary for New York City is designed for a couple traveling on an economy budget, focusing on experiencing iconic landmarks, vibrant neighborhoods, and breathtaking views primarily through free or low-cost activities and efficient use of public transportation (MetroCard recommended for subway and bus travel). Food expenses can be managed by exploring street food, delis, and casual eateries.",
            hotelsOptions: [
              {
                hotelName: "Pod 39",
                hotelAddress: "145 East 39th Street, New York, NY 10016",
                priceRange: "$88 - $180 per night",
                imageUrl: "https://example.com/pod39.jpg",
                rating: 8.5,
                description:
                  "Pod 39 offers modern, compact rooms in a central Midtown East location, just a short walk from Grand Central Terminal. It features a popular rooftop bar with city views and complimentary Wi-Fi, making it a great base for budget-conscious travelers.",
                coordinate: {
                  latitude: 40.7505,
                  longitude: -73.9782,
                },
              },
              {
                hotelName: "The Jane Hotel",
                hotelAddress: "113 Jane St, New York, NY 10014",
                priceRange: "$100 - $220 per night",
                imageUrl: "https://example.com/thejane.jpg",
                rating: 7.8,
                description:
                  "Located in the charming West Village, The Jane Hotel is a historic property offering unique and budget-friendly accommodations. It's known for its distinctive character and proximity to various dining and entertainment options.",
                coordinate: {
                  latitude: 40.7381,
                  longitude: -74.0084,
                },
              },
              {
                hotelName: "The Local NYC",
                hotelAddress: "13-02 44th Ave, Long Island City, NY 11101",
                priceRange: "$120 - $250 per night (for private rooms)",
                imageUrl: "https://example.com/thelocalnyc.jpg",
                rating: 8.2,
                description:
                  "Situated in Long Island City, just a few subway stops from Manhattan, The Local NYC is a trendy hotel (also offers hostel options) with private rooms. It boasts a rooftop terrace offering panoramic views of the Manhattan skyline and easy access to public transport.",
                coordinate: {
                  latitude: 40.7454,
                  longitude: -73.9456,
                },
              },
            ],
            itinerary: [
              {
                dayNumber: 1,
                theme: "Iconic Manhattan Landmarks & Green Spaces",
                activities: [
                  {
                    activityName: "Explore Central Park",
                    description:
                      "Begin your day with a leisurely stroll through Central Park, New York City's expansive urban oasis. Discover iconic spots like Bethesda Terrace, Bow Bridge, and Strawberry Fields. It's a perfect free escape from the city hustle.",
                    imageUrl: "https://example.com/centralpark.jpg",
                    ticketPrice: "Free",
                    timeRange: "9:00 AM - 12:00 PM",
                    timeToTravel:
                      "Varies by hotel location (e.g., 15-30 min subway/walk)",
                    coordinate: {
                      latitude: 40.7792,
                      longitude: -73.9717,
                    },
                  },
                  {
                    activityName: "Times Square Experience",
                    description:
                      "Immerse yourselves in the dazzling lights and vibrant energy of Times Square. While it can be crowded, it's a quintessential NYC experience and completely free to enjoy the spectacle.",
                    imageUrl: "https://example.com/timessquare.jpg",
                    ticketPrice: "Free",
                    timeRange: "1:00 PM - 2:00 PM",
                    timeToTravel:
                      "10-15 minutes by subway or walk from Central Park area",
                    coordinate: {
                      latitude: 40.758,
                      longitude: -73.9855,
                    },
                  },
                  {
                    activityName: "Bryant Park & New York Public Library",
                    description:
                      "Relax in Bryant Park, often called 'Manhattan's Town Square,' known for its lush gardens and various free activities. Afterwards, admire the stunning Beaux-Arts architecture of the New York Public Library's Stephen A. Schwarzman Building. You can take a free self-guided audio tour.",
                    imageUrl: "https://example.com/bryantpark-nypl.jpg",
                    ticketPrice: "Free",
                    timeRange: "2:00 PM - 4:30 PM",
                    timeToTravel: "5-10 minutes walk from Times Square",
                    coordinate: {
                      latitude: 40.7538,
                      longitude: -73.9835,
                    },
                  },
                  {
                    activityName: "Grand Central Terminal",
                    description:
                      "Visit the majestic Grand Central Terminal and marvel at its iconic architecture, particularly the celestial ceiling mural in the Main Concourse. It’s a bustling transportation hub and a beautiful historic landmark.",
                    imageUrl: "https://example.com/grandcentral.jpg",
                    ticketPrice: "Free",
                    timeRange: "4:30 PM - 5:30 PM",
                    timeToTravel: "5-10 minutes walk from Bryant Park",
                    coordinate: {
                      latitude: 40.7527,
                      longitude: -73.9772,
                    },
                  },
                ],
              },
              {
                dayNumber: 2,
                theme: "Brooklyn Views & Lower Manhattan Charm",
                activities: [
                  {
                    activityName: "Staten Island Ferry & Battery Park",
                    description:
                      "Take the free Staten Island Ferry for incredible views of the Statue of Liberty, Ellis Island, and the Lower Manhattan skyline. Afterwards, explore Battery Park, a historic waterfront park with gardens and monuments.",
                    imageUrl: "https://example.com/statenislandferry.jpg",
                    ticketPrice: "Free",
                    timeRange: "9:00 AM - 12:00 PM",
                    timeToTravel:
                      "20-30 minutes by subway to Whitehall Terminal",
                    coordinate: {
                      latitude: 40.7032,
                      longitude: -74.0132,
                    },
                  },
                  {
                    activityName: "Walk the Brooklyn Bridge",
                    description:
                      "Embark on an iconic walk across the Brooklyn Bridge from Manhattan to Brooklyn. This pedestrian-friendly bridge offers breathtaking panoramic views of both boroughs and the harbor. Allow ample time for photos.",
                    imageUrl: "https://example.com/brooklynbridge.jpg",
                    ticketPrice: "Free",
                    timeRange: "1:00 PM - 2:30 PM",
                    timeToTravel:
                      "15-20 minutes walk from Battery Park to Manhattan entrance of Brooklyn Bridge",
                    coordinate: {
                      latitude: 40.71,
                      longitude: -74.0034,
                    },
                  },
                  {
                    activityName: "DUMBO & Brooklyn Bridge Park",
                    description:
                      "After crossing the bridge, explore DUMBO (Down Under the Manhattan Bridge Overpass). Capture the famous shot of the Empire State Building framed by the Manhattan Bridge on Washington Street, and enjoy the waterfront views at Brooklyn Bridge Park.",
                    imageUrl: "https://example.com/dumbo.jpg",
                    ticketPrice:
                      "Free (Jane's Carousel is $3 per ride if desired)",
                    timeRange: "2:30 PM - 4:30 PM",
                    timeToTravel: "Walk directly from Brooklyn Bridge exit",
                    coordinate: {
                      latitude: 40.7031,
                      longitude: -73.9882,
                    },
                  },
                  {
                    activityName: "The High Line & Chelsea Market",
                    description:
                      "Walk along The High Line, an elevated public park built on a historic freight rail line. Enjoy unique perspectives of the city, urban art, and greenery. Conclude your day with a visit to Chelsea Market, a vibrant indoor food hall and shopping destination, perfect for a casual and affordable dinner.",
                    imageUrl: "https://example.com/highline-chelseamarket.jpg",
                    ticketPrice: "Free (food at Chelsea Market costs extra)",
                    timeRange: "5:00 PM - 8:00 PM",
                    timeToTravel:
                      "30-40 minutes by subway from DUMBO to 14th St/8th Ave or 23rd St/8th Ave, then walk to High Line entrance",
                    coordinate: {
                      latitude: 40.739,
                      longitude: -74.0076,
                    },
                  },
                ],
              },
            ],
          }),
        },
      ],
    },
  ],
});

//Main function to generate the trip
export async function generateTripWithAI(DYNAMIC_PROMPT){
    try {
        const response = await chat.sendMessage({
            message: DYNAMIC_PROMPT,
        });

        const textResponse = response.text;
        // console.log("Chat response:", textResponse);
        //CLEANING THE STRING: Remove markdown JSON formatting if the AI includes it
        const cleanJson = textResponse.replace(/```json|```/g, "").trim();
        // console.log("Clean json:", cleanJson);
        return JSON.parse(cleanJson);

    } catch (error) {
        console.error("Error generating trip:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}


