import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "@/constants";
import { CustomButton, FormField } from "@/components";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setUser, clearUser } from '@/store/userSlice';

const SignUp = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleClearUser = () => {
    dispatch(clearUser());
  };

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      // handleSetUser();
      // setUser(result);
      // setIsLogged(true);

      router.replace("/servicetabs/home");
    } catch (error) {
      if (error instanceof Error) Alert.alert("Error", error.message);
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

          <Text className="text-2xl font-semibold text-black mt-0 font-psemibold ml-4 mb-6">
            Sign Up to <Text className="text-secondary">Sewa Ghar</Text>
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
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
              href="/sign-in/serviceProvider"
              className="text-lg font-psemibold text-secondary"
            >
              Login {''}
            <Text className="text-lg text-black-100 font-pregular">
              as a Service Provider
            </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
