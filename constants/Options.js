export const SelectTravelesrOptions = [
  {
    id: 1,
    title: "just me",
    desc: "A Solo travelers in exploration",
    icon: "✈️",
    people: "1 Person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family Trip",
    desc: "A trip with family members",
    icon: "🏠",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Group of Friends",
    desc: "A trip with a group of friends",
    icon: "⛵",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of cost",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "keep cost on average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about the cost",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Genarate Travel Plan For Location : {location}, for {totalDays} Days and {totalNight} Night for {traveler} with a {budget} budget with a Flight details , Flight Price with booking url ,Hotels options list with HotelName , Hotel address , Price ,hotel image url ,geo coordinates , rating, descriptions and Places to visit nearby with placeName ,Place Details, place image url and geo coordinates, ticket Pricing, Time travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format";
