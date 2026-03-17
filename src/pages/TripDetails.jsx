import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Calendar } from "lucide-react";
import Itinerary from "../components/shared/Itinerary";
import HotelCard from "../components/shared/HotelCard";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TripStats from "../components/shared/TripStats";
import { getPlacePhoto } from "../services/placePhotoApi";

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      {/* carousel example */}
    </Carousel>
  );
}

const TripDetails = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placeImage, setPlaceImage] = useState(null);
  const navigate = useNavigate();

  const fetchTripData = async () => {
    try {
      const docRef = doc(db, "trips-ai", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        setError("Trip not found");
      }
    } catch (err) {
      setError("Failed to load trip details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripId) {
      fetchTripData();
    }
  }, [tripId]);

  // Hero image fetch
  useEffect(() => {
    let isMounted = true;
    
    const fetchImage = async () => {
      if (trip?.userSelection?.destination && isMounted) {
        const place = trip.userSelection.destination.split(",")[0];
        const image = await getPlacePhoto(place);
        if (isMounted) {
          setPlaceImage(image);
        }
      }
    };

    fetchImage();
    
    return () => {
      isMounted = false;
    };
  }, [trip]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/my-trips')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Go Back to My Trips
        </button>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Trip not found</p>
        <button 
          onClick={() => navigate('/my-trips')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Go Back to My Trips
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-background">
        {/* HERO SECTION */}
        <div className="relative h-88 md:h-111 bg-gray-900">
          <img
            src={placeImage || "/pri_image.jpeg"}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

          <div className="max-padd-container absolute bottom-0 left-0 right-0 text-white">
            <button
              onClick={() => navigate("/create-trip")}
              className="flexCenter gap-2 mb-4 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
            >
              <FaArrowLeftLong />
              Plan another Trip
            </button>

            <h1 className="mb-2">
              {trip?.userSelection?.destination?.split(",")[0]}
            </h1>

            <p className="max-w-2xl mb-10 text-gray-300">
              {trip?.tripData?.tripNote?.split(".")[0]}
            </p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-padd-container py-12">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              <div className="sm:bg-white rounded-2xl sm:shadow-sm sm:border border-gray-100 sm:p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                  Your Daily Plan
                </h2>

                <Itinerary trip={trip} />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
              >
                <CarouselContent>
                  {trip?.tripData?.hotelsOptions?.map((hotel, index) => (
                    <CarouselItem key={index}>
                      <HotelCard hotel={hotel} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <TripStats trip={trip} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;