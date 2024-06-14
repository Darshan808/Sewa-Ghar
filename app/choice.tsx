import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";

const Welcome = () => {

  // if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <Loader isLoading={loading} /> */}

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ height: '100%'}}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 p-5 items-center">
            <Image
                source={images.logo}
                className="w-[250px] h-[164px]"
                resizeMode="contain"
            />
            <Text className="text-3xl text-black font-pbold">Choose your <Text className="text-secondary">role</Text></Text>

            <TouchableOpacity className="w-4/5 p-5 my-2 bg-gray-200 rounded-lg items-center" onPress={() => router.push('/sign-in/customer')}>
                <Image source={images.user} className="h-20 w-20" resizeMode="contain" />
                <Text className="mt-2 text-lg font-bold">I am a Customer</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-4/5 p-5 my-2 bg-gray-200 rounded-lg items-center" onPress={() => router.push('/sign-in/serviceProvider')}>
                <Image source={images.service_provider} className="h-20 w-20" resizeMode="contain"/>
                <Text className="mt-2 text-lg font-bold">I am a Service Provider</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Welcome;
