import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function FlighInfo({ flightData }) {
  //   if (!flightData) {
  //     return (
  //       <View>
  //         <Text>No flight data available</Text>
  //       </View>
  //     );
  //   }

  return (
    <View
      style={{
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY,
        padding: 15,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          ✈️ Flight Details
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 5,
            width: 100,
            borderRadius: 7,
            marginTop: 7,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",

              color: Colors.WHITE,
              textAlign: "center",
            }}
          >
            Book Here
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 17,
          marginTop: 7,
        }}
      >
        Airline:{" "}
        {flightData.airline_example ||
          flightData.airline ||
          flightData.airline_options}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 17,
        }}
      >
        Price:{" "}
        {flightData.flight_price_estimate ||
          flightData.flight_price_per_person ||
          flightData.flightPricePerPerson}
      </Text>
      {/* <Text>Duration: {flightData.flight_duration_estimate}</Text>
      <Text>Airlines: {flightData.airline_example}</Text> */}
    </View>
  );
}

{
  /* <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>
        Flight Details
      </Text>
      <Text>From: {flightData.from}</Text>
      <Text>To: {flightData.to}</Text>
      <Text>Price: {flightData.flight_price_estimate}</Text>
      <Text>Duration: {flightData.flight_duration_estimate}</Text>
      <Text>Airlines: {flightData.airline_example}</Text> */
}
