import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Modal, Text} from "react-native";
import { icons } from "@/constants";
import { EmptyState, InfoBox, BookedServiceCard  } from "@/components/index";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearUser } from '@/store/userSlice';
import { images } from "@/constants";
import { useState } from "react";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const posts:any[] = [];

  const logout = async () => {
    dispatch(clearUser());
    router.replace("/index");
  };
  const handleLogout = () => {
    setShowModal(true);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <BookedServiceCard
            name="dp"
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Services Ordered"
            subtitle="No Services found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={handleLogout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <Modal
              visible={showModal}
              transparent
              animationType="fade"
              onRequestClose={() => setShowModal(false)}
            >
              <View className={`flex-1 justify-center items-center bg-grey bg-opacity-40 backdrop-blur-sm`}>
                <View className={`bg-white p-6 rounded-lg shadow-lg`}>
                  <Text className={`text-lg font-bold mb-4 text-center`}>Do you want to log out?</Text>
                  <View className={`flex-row justify-between`}>
                    <TouchableOpacity
                      className={`bg-red-500 py-3 px-6 rounded-lg`}
                      onPress={() => setShowModal(false)}
                    >
                      <Text className={`text-white font-bold`}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`bg-green-500 py-3 px-6 rounded-lg`}
                      onPress={logout}
                    >
                      <Text className={`text-white font-bold`}>Yes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <View className="w-20 h-20 border border-secondary rounded-lg flex justify-center items-center">
                <Image
                  source={images.my_avatar}
                  className="flex-1 w-40 h-40 absolute"
                  resizeMode="contain"
                />
            </View>

            <InfoBox
              title={user.name}
              subtitle={""}
              containerStyles="mt-5"
              titleStyles="text-lg text-black"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title="10"
                subtitle="Ordered"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1"
                subtitle="Pending"
                titleStyles="text-xl"
                containerStyles={""}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
