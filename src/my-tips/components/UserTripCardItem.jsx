import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";

import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
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
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hovar:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : "/plane.jpg"}
          className="object-cover rounded-xl"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trips?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
