import { useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "@/constants";
import { CustomButton, FormField } from "@/components";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setUser, clearUser } from '@/store/userSlice';
import { BASE_URL } from "@/app/config";
import axios from "axios";

const SignIn = () => {
  const params = useLocalSearchParams();
  const type = params["type"] as 'serviceProvider' | 'customer';

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleSetUser = () => {
    dispatch(setUser({ 
      category: type === 'customer' ? 'Customer' : 'Service Provider',
      services: [],
      description: 'I am a custom Discription',
      profileImage: "load later",
      requests: [],
      name: 'John Doe',
      email: 'john.doe@example.com',
      id: 1,
      phoneNumber: '1234567890',
      address: '123, Main Street, New York',
      bookedServices: [{type:"Barber",id: 1, name: 'Service 1', date: '2022-12-12', time: '12:00', location: 'New York', serviceCharge: 1000, status: 'Confirmed'}]
     }));
  };
  const handleClearUser = () => {
    dispatch(clearUser());
  };
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/login/user`, form);
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
      if(type === 'customer') router.push('/home')
      else router.push('/service-provider')
    } catch (error) {
      if(error instanceof Error) Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
        <SafeAreaView className="bg-primary">
      <ScrollView>
        <View
          className="w-full flex px-4"
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[200px] h-[124px] mt-0 mb-0 mx-auto"
          />
          <Text className="text-2xl font-semibold text-black mt-0 font-psemibold mb-6 ml-4">
            Log in to <Text className="text-secondary">Sewa Ghar</Text>
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={() => {
              console.log({form});
              submit();
            }}
            containerStyles="mt-10"
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-column items-center gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href={`/sign-up/${type}`}
              className="text-lg font-psemibold text-secondary"
            >
            Signup {' '}
            <Text className="text-lg text-black-100 font-pregular">
              as a {type === "customer" ? "Customer" : "Service Provider"}
            </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
