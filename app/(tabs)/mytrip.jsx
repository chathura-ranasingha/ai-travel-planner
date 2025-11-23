import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Text, View } from "react-native";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { Colors } from "../../constants/Colors";

export default function MyTrip() {
  const [useTrips, setUseTrips] = useState([]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
          }}
        >
          My Trips
        </Text>
        <Ionicons name="add-circle" size={50} color="black" />
      </View>

      {useTrips.length === 0 ? <StartNewTripCard /> : null}
    </View>
  );
}
