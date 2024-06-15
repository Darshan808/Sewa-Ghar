import { View, Text, Image } from 'react-native'
import { images, icons } from '@/constants'
import { CustomButton } from '@/components'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
  <View className="flex-1 justify-center items-center">
      <View className="flex-1 bg-white p-6 rounded-lg shadow-lg mt-16 mb-12 mx-5 relative">
        <Image
          source={images.user_avatar} // replace with actual image URL
          className="w-24 h-24 rounded-full mx-auto"
        />
        <Text className="text-xl font-semibold text-center mt-4">
          {user.name}
        </Text>
        <Text className="text-center text-gray-600 mt-2">
          {/* {user.category} */}
          My ratings
        </Text>
        <View className="flex-row justify-center items-center mt-2 mb-4">
          {
            Array.from({length: 4}).map((_, index) => (
              <Image
                key={`star-${index}`}
                source={icons.star}
                className="w-4 h-4"
              />
            ))
          }
        </View>
        <Text className="font-semibold">About Me</Text>
        <Text className="text-gray-700 mt-4">
          {user.description}
        </Text>
        <View className="flex-row mt-4">
          <Text className="font-semibold">Services Provided: </Text>
          <Text className="text-gray-700">
            {user.services.length}
          </Text>
        </View>
        <CustomButton
            title="Edit Profile"
            containerStyles="mr-2 bg-blue-400 absolute bottom-10 right-2 px-4"
            textStyles="text-sm"
            icon={icons.profile}
            handlePress={()=>null}
        />
      </View>
    </View>
  )
}

export default Profile