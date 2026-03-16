import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { BUDGET_OPTIONS, TRAVELER_OPTIONS } from "../assets/data";
import { generateTripWithAI } from "../services/aiModel";
import LoginDialog from "../components/shared/LoginDialog";
import { toast, Toaster } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [step, setStep] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    noOfDays: "",
    traveler: "",
    budget: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const handleSearch = async (value) => {
    setFormData({ ...formData, destination: value });

    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${API_KEY}`,
    );

    const data = await res.json();

    setSuggestions(data.features);
    setShowSuggestions(true);
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else generateTrip();
  };

  const generateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      return setOpenDialog(true);
    }

    if (formData.noOfDays > 5) {
      return toast.error("AI can currently generate upto 5 days only.");
    }

    setLoading(true);
    // console.log(formData);

    const DYNAMIC_PROMPT = `Generate a travel plan for Location: ${formData?.destination} for ${formData?.noOfDays} days for a ${formData?.traveler} traveler on ${formData?.budget} budget. Return the result strictly as a single JSON object using camelCase keys, the travel plan with a trip note and must feature hotelsOptions array, each hotel with hotelName, hotelAddress, priceRange, imageUrl, ratimg, description, and a coordinate alongside an itinerary array of daily plans. Each day must include a dayNumber, theme, and an activities array, where each activity contains activityName, description, imageUrl, ticketPrice, timeRange, tiemToTravel and coordinates.`;

    try {
      const tripData = await generateTripWithAI(DYNAMIC_PROMPT);
      // console.log(tripData)
      await saveToDB(tripData);
    } catch (error) {
      setLoading(false);
      console.log("AI Error:", error);
      toast.error(
        error.message?.includes("429")
          ? "Rate limit hit! Wait 60s."
          : "Generation failed.",
      );
    }
  };

  const saveToDB = async (tripdata) => {
    try {
      console.log("Saving trip to Firestore...");

      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();

      await setDoc(doc(db, "trips-ai", docId), {
        userSelection: formData,
        tripData: tripdata,
        userEmail: user?.email,
        id: docId,
      });

      console.log("Trip saved successfully");

      setLoading(false);
      toast.success("Trip generated!");

      navigate("/trips/" + docId);
    } catch (error) {
      console.log("Firestore Error:", error);
      setLoading(false);
      toast.error("Failed to save trip.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex-col flexCenter p-4">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-200 rounded-full animate-ping opacity-25" />
          <div className="relative bg-white p-4 rounded-full shadow-xl">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          </div>
        </div>
        <h3 className="mt-8 text-gray-900">
          Creating your trip to {formData.destination?.split(",")[0]}...
        </h3>
        <p className="mt-2 text-gray-500 animate-pulse">
          Our AI is finding the best hotels and hidden gems...
        </p>
      </div>
    );
  }

  return (
    <div className="max-padd-container flex justify-center items-start pt-24">
      {/* <Toaster richColors position="top-right" /> */}
      {/* Container */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Progress Bar */}
        <div className="h-2 bg-indigo-100 w-full">
          <div
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-5 md:p-12 flex flex-col flex-1">
          {/* Steps indicators */}
          <div className="flexCenter space-x-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === s
                    ? "w-8 bg-indigo-600"
                    : step > s
                      ? "w-2 bg-indigo-600"
                      : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col pt-2 sm:pt-12">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6 ">
                <div className="text-center mb-8">
                  <h3 className="mb-2">Where's your next adventure?</h3>
                  <p>Select your destination and duration(max 5 days).</p>
                </div>

                {/* Destination Input */}
                <div className="space-y-4 relative">
                  <label className="text-sm font-medium ml-1">
                    Destination
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={formData.destination}
                      placeholder="Search for a city ..."
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full border p-2 pr-10 rounded-md"
                    />

                    {/* Dropdown Icon */}
                    <ChevronDown
                      onClick={toggleSuggestions}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer transition-transform ${
                        showSuggestions ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-md shadow-md z-10 max-h-60 overflow-y-auto">
                      {suggestions.map((place, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              destination: place.properties.formatted,
                            });
                            setSuggestions([]);
                            setShowSuggestions(false);
                          }}
                        >
                          {place.properties.formatted}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 pt-2 ">
                  <label className="text-sm font-medium ml-1">
                    How many days?
                  </label>
                  <div className="relative ">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      min={1}
                      max={5}
                      placeholder="1"
                      value={formData.noOfDays}
                      onChange={(e) =>
                        handleInputChange("noOfDays", e.target.value)
                      }
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="mb-2">What's your Budget??</h3>
                  <p>We'll find spots that match your wallet.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleInputChange("budget", opt.id)}
                      className={`p-4 rounded-xl border-3 transition-all flexCenter flex-col gap-3 ${formData.budget === opt.id ? "border-indigo-600 bg-indigo-50 shadow-md scale-105" : "border-gray-100 hover:border-indigo-600 hover:bg-indigo-50"}`}
                    >
                      <div
                        className={`p-3 rounded-full ${formData.budget === opt.id ? "bg-indigo-100" : "bg-gray-100"}`}
                      >
                        {opt.icon}
                      </div>
                      <h5 className="font-bold">{opt.label}</h5>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Traveller Type */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="mb-2">Who are you travelling with?</h3>
                  <p>Customize your experience based on your group.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
                  {TRAVELER_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleInputChange("traveler", opt.id)}
                      className={`p-4 rounded-xl border-3 transition-all flexCenter flex-col gap-3 ${formData.traveler === opt.id ? "border-indigo-600 bg-indigo-50 shadow-md scale-105" : "border-gray-100 hover:border-indigo-600 hover:bg-indigo-50"}`}
                    >
                      <span className={"text-3xl"}>{opt.icon}</span>
                      <div>
                        <h5 className="font-bold">{opt.title}</h5>
                        <p className="opacity-70">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* NAVIGATION */}
          <div className="flexBetween pt-6 border-t border-gray-100">
            <button
              onClick={handleBack}
              className={`text-gray-500 hover:text-gray-900 font-medium px-4 py-2 ${step === 1 && "invisible"}`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.destination) ||
                (step === 1 && !formData.noOfDays) ||
                (step === 2 && !formData.budget) ||
                (step === 3 && !formData.traveler)
              }
              className={`flex items-center px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${(step === 1 && !formData.destination) || (step === 1 && !formData.noOfDays) || (step === 2 && !formData.budget) || (step === 3 && !formData.traveler) ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"}`}
            >
              {step === 3 ? "Generate Plan" : "Continue"}
              {step === 3 ? (
                <CheckCircle className="ml-2 w-5 h-5" />
              ) : (
                <ArrowRight className="ml-2 w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      <LoginDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
};

export default CreateTrip;
