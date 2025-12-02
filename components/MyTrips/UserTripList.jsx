import moment from "moment/moment";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";

export default function UserTripList({ useTrips }) {
  // Parse the tripData JSON string to access the location info
  const tripData = useTrips[0]?.tripData
    ? JSON.parse(useTrips[0].tripData)
    : null;
  const locationName = tripData?.locationInfo?.name;

  return (
    <View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        {tripData?.locationInfo?.photoRef ? (
          <Image
            source={{
              uri:
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                tripData?.locationInfo?.photoRef +
                "&key=" +
                process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            }}
            style={{
              width: "100%",
              height: 240,
              objectFit: "cover",
              borderRadius: 15,
            }}
          />
        ) : (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={{
              width: "100%",
              height: 240,
              objectFit: "cover",
              borderRadius: 15,
            }}
          />
        )}

        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            {/* location */}
            {locationName || "No location"}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
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
              {moment(tripData?.startDate).format("YYYY  MMM  DD") ||
                tripData?.startDate ||
                "No start date"}{" "}
            </Text>
            {/* travelers */}
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 17,
                color: Colors.GRAY,
              }}
            >
              🚌 {tripData.traveler.title}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 15,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: "outfit-medium",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              See Your Plan
            </Text>
          </TouchableOpacity>
        </View>
        {useTrips.map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </View>
    </View>
  );
}
