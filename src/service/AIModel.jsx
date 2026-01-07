import { GoogleGenAI } from "@google/genai";


const apiKey = importScripts.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession=model.StartChat({
  generationConfig,
  history:[
    {
      role: "user",
parts: [
  {
    text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON"
  },
],
{
  role:"model",
  parts: [
  {
   parts: [
  {
    text: "```json\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$100 per night\",\n      \"hotelImageUrl\": \"https://www.theDcasino.com/images/hero/main-hero-02.jpg\",\n      \"geoCoordinates\": \"36.1695, -115.1438\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A budget-friendly hotel located in downtown Las Vegas with a retro vibe. It features a casino, a pool, and several dining options.\"\n    },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$45-$90 per night\",\n      \"hotelImageUrl\": \"https://excalibur.mgmresorts.com/content/dam/MGM/excalibur/images/hero/excalibur-hero.jpg\",\n      \"geoCoordinates\": \"36.0988, -115.1740\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A castle-themed hotel on the Strip offering affordable rooms, entertainment, and easy access to major attractions.\"\n    }\n  ]\n}\n```"
  }
]

  }
]

}

    
  ]
});

