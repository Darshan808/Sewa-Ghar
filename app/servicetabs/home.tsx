import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View } from "react-native";
import { images } from "../../constants";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StatusBar } from "expo-status-bar";
import {router} from "expo-router";
import { RequestCard } from "@/components";

const Home = () => {
  interface Request {
    id: number;
    name: string;
    service: string;
    location: string;
  }
  const user = useSelector((state: RootState) => state.user);
  const requests: Request[] = [{id:1, name:"Darshan Poudel", location:"Kathmandu", service:"Electrician"}, {id:2, name:"Nabin Neupane", location:"Kathmandu", service:"Plumber"}];

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={requests}
        keyExtractor={(item:Request) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({ item }:{item:Request}) => (
            <RequestCard 
                name={item.name}
                location={item.location}
                service={item.service}
                onPress={()=> null}
            />
        )}
        ListHeaderComponent={() => (
          <View className="flex mt-4 px-4 space-y-2">
            <View className="flex justify-between items-start flex-row">
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
                  source={images.my_avatar}
                  className="w-20 h-20"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className="w-full flex-1 pt-5 pb-2">
              <Text className="text-lg font-pregular text-black-100 mb-3">
                Available Services
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
