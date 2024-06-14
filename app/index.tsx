import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";

const Welcome = () => {
  // if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <Loader isLoading={loading} /> */}

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ height: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex items-center px-4">
          <Image
            source={images.logo}
            className="w-[250px] h-[164px]"
            resizeMode="contain"
          />
          <View className="flex-1 flex-row items-center w-full mt-[10vh]">
            <Image
              source={images.home_clean}
              className="flex-1 aspect-auto"
              resizeMode="contain"
            />
            <Image
              source={images.ac_repair}
              className="flex-1 aspect-auto"
              resizeMode="contain"
            />
          </View>

          <View className="relative mt-[18vh]">
            <Text className="text-3xl text-black font-bold text-center">
              Find trusted experts{"\n"}
              with <Text className="text-secondary-200">Sewa Ghar</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-black-100 mt-7 text-center">
            Welcome to your go-to hub for finding reliable professionals in your
            area! Whether you need home services, appliance and electronics
            repairs, beauty services, and more, we’ve got you covered. Discover
            trusted experts at your fingertips.
          </Text>

          <CustomButton
            title="Continue"
            handlePress={() => router.push("/choice")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Welcome;
