import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import FlighInfo from "../../components/TripDetails/FlighInfo";
import HotelList from "../../components/TripDetails/HotelList";
import { Colors } from "../../constants/Colors";

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);
  const formatData = (data) => {
    return JSON.parse(data);
  };

  const travelerInfo = tripDetails?.tripData
    ? JSON.parse(tripDetails.tripData)?.traveler
    : null;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

    // Add safety checks before parsing
    if (trip) {
      try {
        const parsed = JSON.parse(trip);
        setTripDetails(parsed);
      } catch (err) {
        console.error("Failed to parse trip data:", err);
        setError("Invalid trip data");
      }
    } else {
      setError("No trip data provided");
    }
  }, [trip]);

  // Handle loading state
  if (!tripDetails && !error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Handle error state
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Parse nested tripData safely
  const locationInfo = tripDetails?.tripData
    ? JSON.parse(tripDetails.tripData)?.locationInfo
    : null;

  return (
    <View>
      {locationInfo?.photoRef && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          style={{
            width: "100%",
            height: 330,
          }}
        />
      )}

      {/* location */}
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.WHITE,
          height: "100%",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          marginTop: -30,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          {locationInfo?.name || "No location"}
        </Text>

        {/* start date */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 5,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 17,
              color: Colors.GRAY,
            }}
          >
            {/* start date */}
            {moment(tripDetails?.startDate).format("YYYY MMM DD") ||
              tripDetails?.startDate ||
              "No start date"}{" "}
          </Text>

          {/* end date */}
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 17,
              color: Colors.GRAY,
            }}
          >
            {/* end date +1 */}-{" "}
            {moment(tripDetails?.endDate)
              .add(1, "days")
              .format("YYYY MMM DD") ||
              tripDetails?.endDate ||
              "No end date"}{" "}
          </Text>
        </View>
        {/* travelers */}
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 17,
            color: Colors.GRAY,
          }}
        >
          🚌 {travelerInfo?.title || "No traveler info"}
        </Text>
        {/* flight info */}
        <FlighInfo
          flightData={tripDetails?.tripPlan?.travel_plan?.flight_details}
        />
        {/* hotel list */}
        <HotelList
          hotelData={tripDetails?.tripPlan?.travel_plan?.hotel_options}
        />
        {/* trip day planner */}
      </View>
    </View>
  );
}
