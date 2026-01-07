import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: place.placeName,
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
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hovar:scale-105 transition-all hovar:shadow-md cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "/plane.jpg"}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />

        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm ⬜ text-gray-400">{place.placeDescription}</p>
          <h2 className="mt-2">🕒 {place.timeToTravel}</h2>
          {/* <Button size="sm"><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
