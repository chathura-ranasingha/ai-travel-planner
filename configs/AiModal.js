const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan For Location : LK Metro Alley, Pattaya City, Bang Lamung District, Chon Buri, Thailand, for 2 Days and 1 Night for Group of Friends with a Luxury budget with a Flight details , Flight Price with booking url ,Hotels options list with HotelName , Hotel address , Price ,hotel image url ,geo coordinates , rating, descriptions and Places to visit nearby with placeName ,Place Details, place image url and geo coordinates, ticket Pricing, Time travel each of the location for 2 days and 1 night with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [{ text: "```json\n{" }],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
