import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../configs/FirebaseConfig";
import { Colors } from "../../../constants/Colors";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.replace("/mytrip");
        // navigate or update UI here if needed
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        switch (errorCode) {
          case "auth/invalid-email":
            ToastAndroid.show("Invalid email address", ToastAndroid.LONG);
            break;
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/invalid-credential":
            ToastAndroid.show("Invalid credentials", ToastAndroid.LONG);
            break;
          case "auth/too-many-requests":
            ToastAndroid.show(
              "Too many attempts. Try again later.",
              ToastAndroid.LONG
            );
            break;
          default:
            ToastAndroid.show(
              errorMessage || "Sign-in failed",
              ToastAndroid.LONG
            );
        }
      });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 40,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginTop: 30,
        }}
      >
        Let's Sign You In
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 20,
        }}
      >
        Welcome Back
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 10,
        }}
      >
        You've been missed!
      </Text>
      {/* Email */}
      <View
        style={{
          marginTop: 50,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
          }}
        >
          Email
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(Value) => setEmail(Value)}
          placeholder="Enter Email"
        />
      </View>
      {/* [password] */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
          }}
        >
          Password
        </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={(Value) => setPassword(Value)}
        />
      </View>
      {/* sign in button */}
      <TouchableOpacity
        onPress={onSignIn}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
      {/* create account button */}
      <TouchableOpacity
        onPress={() => router.replace("/auth/sign-up")}
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    fontFamily: "outfit",
  },
});
