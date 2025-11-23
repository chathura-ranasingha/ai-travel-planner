import { Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function OptionCard({ option, selectedTraveler }) {
  return (
    <View
      style={[
        {
          padding: 25,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors.LIGHT_GRAY,
          borderRadius: 15,
          alignItems: "center",
        },
        selectedTraveler?.id === option.id && { borderWidth: 3 },
      ]}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          {option?.title}
        </Text>

        <Text
          style={{
            fontSize: 17,
            fontFamily: "outfit-bold",
            color: Colors.GRAY,
          }}
        >
          {option?.desc}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 35,
        }}
      >
        {option?.icon}
      </Text>
    </View>
  );
}
