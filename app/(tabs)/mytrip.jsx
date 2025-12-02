import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import UserTripList from "../../components/MyTrips/UserTripList";
import { auth, db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";

export default function MyTrip() {
  const [useTrips, setUseTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUseTrips([]);
    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUseTrips((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        flexGrow: 1,
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

      {loading && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}

      {useTrips.length === 0 ? (
        <StartNewTripCard />
      ) : (
        <UserTripList useTrips={useTrips} />
      )}
    </ScrollView>
  );
}
