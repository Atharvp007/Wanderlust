import React, { useEffect, useState } from "react";
import LocationAutocomplete from "../components/LocationAutocomplete"; // ✅ import component
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { AI_PROMPT } from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {FcGoogle} from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore"; 
import { Navigate } from "react-router-dom";

function CreateTrip() {
 
 const [place,setPlace]=useState();
 const [formdata,setFormdata]=useState([]);
 const [openDialog,setOpenDialog]=useState(false);
 const navigate=Navigate()
 const handleInputChange=(name,value)=>{
  
  setFormdata({
    ...formdata,
    [name]:value
  })
 }
 useEffect(()=>{
  console.log(formdata);
 },[formdata])
 

 const login = useGoogleLogin({
  onSuccess: (codeResp) => console.log(codeResp),
  onError: (error) => console.log(error)
})


 const onGenerrateTrip=async()=>{
   const user=localStorage.getItem("user")
   if(!user){
    setOpenDialog(true);
    return;
   }

  if(formdata?.noofdays>5 &&!formdata?.budget ||!formdata?.location ||!formdata?.traveler){
    toast("Please fill all the details.")
    return;
  }
  const FINAL_PROMPT = AI_PROMPT
  .replace('{location}', formData?.location?.label)
  .replace('{totalDays}', formData?.noOfDays)
  .replace('{traveler}', formData?.traveler)
  .replace('{budget}', formData?.budget)
  
  const result=await chatSession.sendmessage(FINAL_PROMPT);
  SaveAiTrip(result?.response?.text())


 }

 const SaveAiTrip = async (TripData) => {

  const user = JSON.parse(localStorage.getItem('user'));
  const docId = Date.now().toString()

  await setDoc(doc(db, "AITrips", docId), {
    userSelection: formData,
    tripData: JSON.parse(TripData),
    userEmail: user?.email,
    id: docId
  });
  navigate('/view-trip/'+docId)


}

 const GetUserProfile = (tokenInfo) => {
  axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }
  ).then((resp) => {
    console.log(resp);
      console.log(resp);
  localStorage.setItem('user', JSON.stringify(resp.data));
  setOpenDialog(false);
  onGenerateTrip();
  });
}

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences
      </p>

      <div className="mt-20 flex felx-column gap-9">
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
           <GooglePlacesAutocomplete
           apiKey={import.meta.VITE_GOOGLE_PLACE_API_KEY}
           selectProps={{
            place,
            onChange:(v)=>{setPlace(v); handleInputChange('location',v)}
           }}
           
         </div>
      </div>
      <div>
       <h2 className="font-bold text-3xl">How many days are you planning your trip</h2>
       <Input placeholder={'Ex.3'} type='number'
       onChange={(e)=>handleInputChange('noofdays',e.target.value)}/>
      
      </div>
      <div>
  <h2 className="text-xl my-3 font-medium">
    What is Your Budget
  </h2>

  <div className="grid grid-cols-3 gap-5 mt-5">
    {SelectBudgetOptions.map((item, index) => (
      <div
        key={index}
        onClick={(e)=>handleInputChange('budget',item.title)}
        className="p-4 border cursor-pointer rounded-lg"
      >
        <h2 className="text-4xl">{item.icon}</h2>
        <h2 className="font-bold text-lg">{item.title}</h2>
        <h2 className="text-sm text-gray-500">{item.desc}</h2>
      </div>
    ))}
  </div>
  <div>
  <h2 className="text-xl my-3 font-medium">
    Who do you plan on traveling with?
  </h2>

  <div className="grid grid-cols-3 gap-5 mt-5">
    {SelectTravelesList.map((item, index) => (
      <div
        key={index}
        onClick={(e)=>handleInputChange('traveler',item.people)}
        className="p-4 border cursor-pointer rounded-lg"
      >
        <h2 className="text-4xl">{item.icon}</h2>
        <h2 className="font-bold text-lg">{item.title}</h2>
        <h2 className="text-sm text-gray-500">{item.desc}</h2>
      </div>
    ))}
  </div>
</div>
<div className="my-10 justify-end flex">
  <Button onClick={onGenerrateTrip}>Generate Trip</Button>
</div>
<Dialog open={openDialog}>
  
  <DialogContent>
    <DialogHeader>
    
      <DialogDescription>
       <img src="/logo.svg"/>

        <h2 className='font-bold text-lg mt-7'>
         Sign In With Google
        </h2>

        <p>
         Sign in to the App with Google authentication securely.
       </p>

      <Button
     onClick={login}
     className="w-full mt-5 flex gap-4 items-center"
     >
    <FcGoogle className='h-7 w-7' />
    Sign In With Google
    </Button>

      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

</div>


         </div>

  )
};

export default CreateTrip;
