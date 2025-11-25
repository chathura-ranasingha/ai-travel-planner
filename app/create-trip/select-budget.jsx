import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { Colors } from "../../constants/Colors";
import { SelectBudgetOptions } from "../../constants/Options";
import { CreateTripContext } from "../../contex/CreateTripContext";

export default function SelectBudget() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    selectedOption &&
      setTripData({
        ...tripData,
        budget: selectedOption?.title,
      });
  }, [selectedOption]);

  const onClickContinue = () => {
    if (!selectedOption) {
      ToastAndroid.show("Please select a budget", ToastAndroid.LONG);
      return;
    }

    router.push("/create-trip/review-trip");
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: "white",
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
        Budget
      </Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "outfit-bold",
            marginTop: 20,
          }}
        >
          Choose spending habits for your trip
        </Text>

        <FlatList
          data={SelectBudgetOptions}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ marginVertical: 10 }}
              onPress={() => setSelectedOption(item)}
            >
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => onClickContinue()}
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
