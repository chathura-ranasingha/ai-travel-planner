import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../contex/CreateTripContext";

export default function SelectDates() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  const onDateChange = (date, type) => {
    console.log("Selected date:", date, "Type:", type);
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const OnDateSelectionContinue = () => {
    if (startDate === undefined || endDate === undefined) {
      ToastAndroid.show(
        "Please select both start and end dates",
        ToastAndroid.LONG
      );
      return;
    }
    const totalNoOfDays = endDate.diff(startDate, "days");
    console.log("Total number of days:", totalNoOfDays + 1);
    setTripData({
      ...tripData,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      totalNoOfDays: totalNoOfDays + 1,
    });
    navigation.navigate("SelectTraveler");
  };

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
        Travel Dates
      </Text>

      <View
        style={{
          marginTop: 30,
        }}
      >
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{ backgroundColor: Colors.PRIMARY }}
          selectedDayTextStyle={{ color: Colors.WHITE }}
        />
      </View>

      <TouchableOpacity
        onPress={OnDateSelectionContinue}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 35,
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
