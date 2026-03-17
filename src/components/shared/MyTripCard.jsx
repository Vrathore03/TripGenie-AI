import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPlacePhoto } from "../../services/placePhotoApi";
import { Banknote, Clock, MapPin, Users } from "lucide-react";

const MyTripCard = ({ trip }) => {
  const [placeImage, setPlaceImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      if (trip?.userSelection?.destination) {
        const place = trip.userSelection.destination.split(",")[0];
        const image = await getPlacePhoto(place);
        setPlaceImage(image);
      }
    };

    fetchImage();
  }, [trip]);

  return (
    <Link to={"/trips/" + trip.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 overflow-hidden">
      <div className="h-40 relative">
        <img src={placeImage ? placeImage : "/pri_image.jpeg"} alt={trip?.userSelection?.destination} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="">
        <h4 className="text-lg my-2 line-clamp-1">🗾 {trip?.userSelection?.destination}</h4>
        <div className="space-y-3">
          <div className="flexBetween border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm ">
              <Banknote className="h-4 w-4" />
              <h6>Budget</h6>
            </div>
            <p>{trip?.userSelection?.budget}</p>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              <h6>Traveler</h6>
            </div>
            <p>{trip?.userSelection?.traveler}</p>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <h6>No of Days</h6>
            </div>
            <p>{trip?.userSelection?.noOfDays}</p>
          </div>
          <div className="flex flex-col gap-2 py-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <h6>Location:</h6>
              <p>{trip?.userSelection?.destination}</p>
            </div>
            <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg leading-relaxed line-clamp-6">
              {trip?.tripData?.tripNote}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

MyTripCard.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string,
    userSelection: PropTypes.shape({
      destination: PropTypes.string,
      budget: PropTypes.string,
      traveler: PropTypes.string,
      noOfDays: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    tripData: PropTypes.shape({
      tripNote: PropTypes.string,
    }),
  }),
};

export default MyTripCard;
