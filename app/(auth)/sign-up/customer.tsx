import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "@/constants";
import { CustomButton, FormField } from "@/components";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setUser, clearUser } from '@/store/userSlice';
import axios from "axios";
import { BASE_URL } from "@/app/config";


const SignUp = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleClearUser = () => {
    dispatch(clearUser());
  };

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const submit = async () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/register/user`, form);

      const newUser = res.data;
      const userToDispatch = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        category: newUser.role,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address,
        bookedServices: newUser.bookings,
        description: `${newUser.name} lives in ${newUser.address}`,
        services: newUser.issues,
        requests: [],
      }
      dispatch(setUser(userToDispatch));      
      router.push('/home')
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4"
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[200px] h-[124px] mt-0 mb-0 mx-auto"
          />

          <Text className="text-2xl font-semibold text-black mt-0 ml-4 mb-4 font-psemibold">
            Sign Up to <Text className="text-secondary">Sewa Ghar</Text>
          </Text>

          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-5"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />

          <FormField
            title="Phone Number"
            value={form.phoneNumber}
            handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
            otherStyles="mt-5"
            keyboardType={"numpad"}
          />

          <FormField
            title="Address"
            value={form.address}
            handleChangeText={(e) => setForm({ ...form, address: e })}
            otherStyles="mt-5"
            keyboardType={"numeric"}
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-5"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-column items-center gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in/customer"
              className="text-lg font-psemibold text-secondary"
            >
              Login {' '}
            <Text className="text-lg text-black-100 font-pregular">
              as a Customer
            </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
