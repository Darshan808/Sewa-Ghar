import { Text, View, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StatusBar } from "expo-status-bar";
import { BookedService, Service } from "@/constants/types";
import BookedServiceCard from "@/components/BookedServiceCard";
import EmptyState from "@/components/EmptyState";


const Booked= () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={user?.bookedServices}
        keyExtractor={(item:BookedService) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({ item }) => (
          <BookedServiceCard
            name={item.name}
            // image={item.image}
            date={item.date}
            time={item.time}
            location={item.location}
            serviceCharge={item.serviceCharge}
            status={item.status}
            onPress={() => {}}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex flex-1 mt-4 px-4 space-y-2">
            <View className="w-full flex-1 pt-5 pb-2">
              <Text className="text-xl font-pregular text-black-100 mb-3">
                Your Booked Services
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Bookings Yet!" subtitle="Explore and book our services to get started!"/>
        )}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Booked;
