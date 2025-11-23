import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { Colors } from "../../constants/Colors";
import { SelectTravelesrOptions } from "../../constants/Options";
import { CreateTripContext } from "../../contex/CreateTripContext";

export default function selectTraveler() {
  const navigation = useNavigation();
  const [selectTraveler, setSelectTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    setTripData({
      ...tripData,
      traveler: selectTraveler,
    });
  }, [selectTraveler]);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

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
        Who's traveling
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
          }}
        >
          Choose your travelers
        </Text>

        <FlatList
          data={SelectTravelesrOptions}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectTraveler(item)}
              style={{
                marginVertical: 10,
              }}
            >
              <OptionCard option={item} selectedTraveler={selectTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 20,
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
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
