import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View } from "react-native";
import { images } from "../../constants";
import { SearchInput, ServiceCard, DiscountBanner} from "../../components";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import services from "@/constants/services";
import { StatusBar } from "expo-status-bar";
import { Service } from "@/constants/types";
import {router} from "expo-router";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const handlePress = (item: Service) => {
    router.push(`/post/${item.id.toString()}`);
  }

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={services as Service[]}
        keyExtractor={(item:Service) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({ item }) => (
          <ServiceCard
            name={item.name}
            image={item.image}
            onPress={() => handlePress(item)}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex mt-4 px-4 space-y-2">
            <View className="flex justify-between items-start flex-row mb-4">
              <View>
                <Text className="font-pmedium text-sm text-back-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-secondary">
                  {user.name.split(" ")[0]}
                </Text>
              </View>

              <View>
                <Image
                  source={images.user_avatar}
                  className="w-14 h-14 rounded-lg"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />
            <DiscountBanner />

            <View className="w-full flex-1 pt-5 pb-2">
              <Text className="text-lg font-pregular text-black-100 mb-3">
                What are you looking for today ?
              </Text>
            </View>
          </View>
        )}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;
