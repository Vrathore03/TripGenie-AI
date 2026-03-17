import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebaseConfig";
import { Skeleton } from "@/components/ui/skeleton"
import MyTripCard from "../components/shared/MyTripCard";
import { MapPin } from "lucide-react";

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return navigate("/");
    }

    const q = query(
      collection(db, "trips-ai"),
      where("userEmail", "==", user?.email),
    );

    try {
      setLoading(true);
      setError(null);
      const querySnapshot = await getDocs(q);
      const allTrips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrips(allTrips);
    } catch (err) {
      setError("Failed to load your trips. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserTrips();
  }, []);

  if (loading) {
    return (
      <div className="max-padd-container py-22 xl:py-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-122 w-77 rounded-xl bg-white" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-padd-container py-22 xl:py-28 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={getUserTrips}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (userTrips.length === 0) {
    return (
      <div className="max-padd-container py-22 xl:py-28 text-center">
        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No trips yet</h3>
        <p className="text-gray-500 mb-6">Start planning your first adventure!</p>
        <button 
          onClick={() => navigate('/create-trip')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Create Your First Trip
        </button>
      </div>
    );
  }

  return (
    <div className="max-padd-container py-22 xl:py-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {userTrips.map((trip, index) => (
          <MyTripCard key={trip.id || index} trip={trip}/>
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
