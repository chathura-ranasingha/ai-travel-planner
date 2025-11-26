import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import moment from "moment";
import { useContext, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../contex/CreateTripContext";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

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
          marginTop: 20,
        }}
      >
        ReviewTrip
      </Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 23,
            fontFamily: "outfit-bold",
            marginTop: 20,
          }}
        >
          Before genarating your trip , please review your selections
        </Text>

        <View style={{ marginTop: 20 }}>
          {/* Row: Destination */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 30 }}>📍</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-bold",
                  color: Colors.GRAY,
                }}
              >
                Destination
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-medium",
                  marginTop: 5,
                }}
              >
                {tripData?.locationInfo?.name}
              </Text>
            </View>
          </View>

          {/* Row: Travel Date */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 30 }}>📅</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-bold",
                  color: Colors.GRAY,
                }}
              >
                Travel Date
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-medium",
                  marginTop: 4,
                }}
              >
                {moment(tripData?.startDate).format("DD-MM")}
                {" TO " + moment(tripData?.endDate).format("DD-MM") + "   "} (
                {tripData?.totalNoOfDays} days)
              </Text>
            </View>
          </View>

          {/* Row: Traveler */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Text style={{ fontSize: 30 }}>🚌</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-bold",
                  color: Colors.GRAY,
                }}
              >
                Who is Traveling
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-medium",
                  marginTop: 4,
                }}
              >
                {tripData?.traveler?.title}
              </Text>
            </View>
          </View>

          {/* Budget */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 30 }}>💰</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-bold",
                  color: Colors.GRAY,
                }}
              >
                Budget
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-medium",
                  marginTop: 4,
                }}
              >
                {tripData?.budget}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/create-trip/genarate-trip")}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 80,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-medium",
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          Build My Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
