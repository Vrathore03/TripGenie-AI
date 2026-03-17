import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPlacePhoto } from "../../services/placePhotoApi";

const ActivityCard = ({ activity }) => {

  const [image, setImage] = useState(null);

  useEffect(() => {
  const fetchImage = async () => {
    if (activity?.activityName) {

      const searchName = activity.activityName.split(" ").slice(0,2).join(" ");

      const img = await getPlacePhoto(searchName);

      setImage(img);
    }
  };

  fetchImage();
}, [activity]);

  return (
    <div className="group relative flex gap-x-5">
      {/* Icon */}
      <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:translate-x-[0.5px] after:bg-gray-200">
        <div className="relative z-10 size-6 bg-green-500 rounded-full flexCenter">
          🕧
        </div>
      </div>

      {/* Right - Content */}
      <div className="grow pb-8 group-last:pb-0">
        <p className="mb-1 font-bold">{activity.timeRange}</p>
        <p className="pb-1.5 text-xs">
          <b>Travel Time:</b> {activity.timeToTravel}
        </p>

        {/* Card */}
        <div className="block border border-gray-200 rounded-lg hover:shadow-2xs focus:outline-hidden overflow-hidden">
          <div className="relative flex flex-col sm:flex-row sm:items-center overflow-hidden">

            <img
              src={image || "/pri_image.jpeg"}
              className="h-32 sm:w-48 sm:h-full sm:absolute inset-0 object-cover"
              alt={"actImg"}
            />

            <div className="grow p-4 sm:ms-48">
              <div className="min-h-24 flex flex-col sm:justify-center">
                <h6>
                  {activity.activityName}
                  <span className="text-gray-500">
                    💸 {activity.ticketPrice}
                  </span>
                </h6>

                <p className="mt-1">{activity.description}</p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    activityName: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    ticketPrice: PropTypes.string,
    timeRange: PropTypes.string,
    timeToTravel: PropTypes.string,
    coordinate: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
};

export default ActivityCard;