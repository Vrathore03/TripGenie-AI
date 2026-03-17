import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ActivityCard from "./ActivityCard";

const Itinerary = ({ trip }) => {
  const itinerary = trip?.tripData?.itinerary;
  
  if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No itinerary available for this trip.</p>
      </div>
    );
  }

  return (
    <section>
      <Accordion type="single" collapsible defaultValue={"item-1"}>
        {itinerary.map((day, index) => (
          <AccordionItem value={`item-${index+1}`} key={index}>
            <AccordionTrigger className="flex items-start justify-start text-[16px] font-bold">
              Day {day?.dayNumber || index + 1}: {day?.theme || "No theme"}
            </AccordionTrigger>
            <AccordionContent>
              {/* Timeline */}
              <div className="mt-4">
                {/* Item - Activity */}
                {day?.activities?.map((activity, i) => (
                  <ActivityCard key={i} activity={activity} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

Itinerary.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      itinerary: PropTypes.arrayOf(
        PropTypes.shape({
          dayNumber: PropTypes.number,
          theme: PropTypes.string,
          activities: PropTypes.array,
        })
      ),
    }),
  }),
};

export default Itinerary;
