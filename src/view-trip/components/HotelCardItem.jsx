import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel?.hotelName,
      };

      const resp = await GetPlaceDetails(data);

      const photoName = resp.data.places?.[0]?.photos?.[0]?.name;

      if (!photoName) return;

      const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);

      setPhotoUrl(PhotoUrl);
      // setImage(photoUrl);
    } catch (error) {
      console.error("Photo fetch failed", error);
    }
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hovar:scale-105 transiton-all cursorr-pointer">
        <img
          src={photoUrl ? photoUrl : "/plane.jpg"}
          className="rounded-xl height-[180px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium ">{hotel?.hotelName}</h2>
          <h2 className="text-xs  text-gray-500 ">📍{hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💰 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
