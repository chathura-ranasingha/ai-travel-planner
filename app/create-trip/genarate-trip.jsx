import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { chatSession } from "../../configs/AiModal";
import { auth, db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import { AI_PROMPT } from "../../constants/Options";
import { CreateTripContext } from "../../contex/CreateTripContext";

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    tripData && GenerateAiTrip();
  }, []);

  const GenerateAiTrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.locationInfo?.name
    )
      .replace("{totalDays}", tripData?.totalNoOfDays)
      .replace("{totalNight}", tripData?.totalNoOfDays - 1)
      .replace("{traveler}", tripData?.traveler?.title)
      .replace("{budget}", tripData?.budget)
      .replace("{totalDays}", tripData?.totalNoOfDays)
      .replace("{totalNight}", tripData?.totalNoOfDays - 1);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());

    const tripResp = JSON.parse(result.response.text());
    setLoading(false);
    const docId = Date.now().toString();
    const result_ = await setDoc(doc(db, "UserTrips", docId), {
      userEmail: user?.email ?? null,
      tripPlan: tripResp, //AI results
      tripData: JSON.stringify(tripData), //user selected data
      docId: docId,
    });

    //router.push("(tabs)/mytrip");
    router.push("/auth/sign-in");
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: "outfit-bold",
          textAlign: "center",
        }}
      >
        Please Wait...
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit-medium",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        We are working to generate your dream trip
      </Text>

      <Image
        source={require("../../assets/images/plane.gif")}
        style={{
          width: "100%",
          height: 200,
          objectFit: "contain",
          marginTop: 50,
        }}
      />

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 20,
          textAlign: "center",
          marginTop: 20,
          color: Colors.GRAY,
        }}
      >
        Do not Go Back
      </Text>
    </View>
  );
}
