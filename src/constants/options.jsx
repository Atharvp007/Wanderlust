export const SelectTravelesList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole travels in exploration',
    icon: '✈️',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travels in tandem',
    icon: '🥂',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '🏡',
    people: '3 to 5 People'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'Traveling with a group of friends',
    icon: '👫',
    people: '4 to 8 People'
  }
];


export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💸',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Don’t worry about cost',
    icon: '💎',
  },
];

export const AI_PROMPT = `
Generate Travel Plan for Location : {location},
for {totalDays} Days for {traveler} with a {budget} budget.
Give me Hotels options list with HotelName, Hotel address, Price,
hotel image url, geo coordinates, rating, descriptions and suggest
itinerary with placeName, Place Details, Place Image Url, Geo
Coordinates, ticket Pricing, Time travel each of the location for
{totalDays} days with each day plan with best time to visit in
JSON format.
`;