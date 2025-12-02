import moment from "moment";
import { Image, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function UserTripCard({ trip }) {
  // Parse the tripData JSON string to access the location info
  const tripData = trip?.tripData ? JSON.parse(trip.tripData) : null;
  const locationName = tripData?.locationInfo?.name;
  const formatData = (data) => {
    return JSON.parse(data);
  };

  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            formatData(trip.tripData).locationInfo?.photoRef +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={{
          width: "100",
          height: 100,

          borderRadius: 15,
        }}
      />

      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
          }}
        >
          {locationName || "No location"}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          {moment(formatData(trip.tripData).startDate).format("YYYY  MMM  DD")}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          Traveling : {formatData(trip.tripData)?.traveler?.title || ""}
        </Text>
      </View>
    </View>
  );
}
