import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { icons, images } from '@/constants';
import { CustomButton } from '@/components';

const Request = () => {
  const user = useSelector((state: RootState) => state.user);
  const params = useLocalSearchParams();
  const serviceId = parseInt(params["id"] as string);
  const service = user.requests.find((request) => request.id === serviceId);
  return (
    <View className="flex-1 bg-white p-6 rounded-lg shadow-lg mt-16 mb-12 mx-5 relative">
    <View className="flex">
      <TouchableOpacity>
        <Image
          source={icons.heart_fill}
          className="w-5 h-5 absolute top-2 right-1"
        />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">{service?.title}</Text>
        <Text className="text-gray-600 text-sm">Posted by: {service?.name}</Text>
        <Text className="text-gray-400 text-sm">{service?.posted}</Text>
        <Text className="text-black font-bold mt-8 mb-1">{service?.description}</Text>
      </View>
    <View className="pt-2 flex flex-row justify-between">
      <View className="flex">
        <Text className="text-gray-900 text-sm">Location: {service?.location}</Text>
        <Text className="text-gray-900 text-sm">Charge: Rs.{service?.charge}</Text>
      </View>
      <Text className="text-secondary mt-4">Show Details</Text>
    </View>
    <View>
    <View className="flex flex-row mt-4 w-full justify-between">
        <CustomButton
            title="Apply"
            containerStyles="flex-1 mr-2 bg-blue-400"
            icon={icons.calendar}
            handlePress={()=>null}
        />
        <CustomButton
            title="Counter"
            containerStyles="flex-1 ml-2"
            icon={icons.clock}
            handlePress={()=>null}
        />
      </View>
    </View>
    </View>
  )
}

export default Request