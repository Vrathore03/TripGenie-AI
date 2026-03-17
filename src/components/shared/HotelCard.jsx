import { Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { getPlacePhoto } from '../../services/placePhotoApi'

const HotelCard = ({ hotel }) => {
  const [hotelImage, setHotelImage] = useState(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    let isMounted = true;
    
    const loadImage = async () => {
      if (hotel?.hotelName && isMounted) {
        try {
          const img = await getPlacePhoto(hotel.hotelName + " hotel");
          if (isMounted) {
            setHotelImage(img);
          }
        } catch {
          if (isMounted) {
            setImageError(true);
          }
        }
      }
    };

    loadImage();
    
    return () => {
      isMounted = false;
    };
  }, [hotel?.hotelName]);

  if (!hotel) return null;

  const priceDisplay = hotel.priceRange 
    ? hotel.priceRange.split(' p')[0] 
    : 'Price not available';

  const mapsUrl = hotel.hotelName && hotel.hotelAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName + ',' + hotel.hotelAddress)}`
    : '#';

  return (
    <Link to={mapsUrl} target='_blank' rel='noopener noreferrer'>
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow'>
        <div className='h-40 bg-gray-200 relative'>
            <img 
              src={hotelImage || "/pri_image.jpeg"} 
              alt={hotel.hotelName || "Hotel"} 
              className='h-full w-full object-cover'
              onError={(e) => {
                e.target.src = "/pri_image.jpeg";
              }}
            />
            {hotel.rating && (
              <div className='absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow-sm text-xs font-bold flex items-center'>
                  <Star className='w-3 h-3 text-yellow-400 mr-1 fill-yellow-400'/> {hotel.rating}
              </div>
            )}
        </div>
        <div className='p-5'>
            <span className='text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 block'>Where you'll stay</span>
            <h5>{hotel.hotelName || "Unnamed Hotel"}</h5>
            {hotel.hotelAddress && (
              <p className='text-xs text-gray-500 mt-1 mb-2 line-clamp-1'>🗾 {hotel.hotelAddress}</p>
            )}
            {hotel.description && (
              <p className='text-sm mt-1 mb-2 line-clamp-1'>{hotel.description}</p>
            )}
            <div className='flexBetween mt-auto pt-3'>
                <div>
                    <h5>{priceDisplay}</h5>
                    <span className='text-[10px] text-gray-500 font-normal uppercase'>est per night</span>
                </div>
                <Button variant='destructive'>View Deal</Button>
            </div>
        </div>
      </div>
    </Link>
  )
}

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    hotelName: PropTypes.string,
    hotelAddress: PropTypes.string,
    priceRange: PropTypes.string,
    imageUrl: PropTypes.string,
    rating: PropTypes.number,
    description: PropTypes.string,
    coordinate: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
};

export default HotelCard;