import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
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
    <div>
      <img
        src={photoUrl ? photoUrl : "/plane.jpg"}
        className="h-[340px w-full object-cover rounded-b-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              {trip.userSelection?.noofdays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              No. of traveler:{trip.userSelection?.traveler}{" "}
            </h2>
          </div>
        </div>
        <button>
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}

export default InfoSection;
