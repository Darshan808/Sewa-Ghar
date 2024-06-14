import { View, Text, TouchableOpacity, Image, ScrollView,  } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { icons, images } from '@/constants';
import { CustomButton, FormField } from '@/components';
import { useState } from 'react';

const Request = () => {
  const user = useSelector((state: RootState) => state.user);
  const params = useLocalSearchParams();
  const serviceId = parseInt(params["id"] as string);
  const [questions, setQuestions] = useState("");
  const service = user.requests.find((request) => request.id === serviceId);
  return (
    <ScrollView className="flex-1">
    <View className="flex-1 bg-white p-6 rounded-lg shadow-lg mt-16 mb-12 mx-5 relative">
    <View className="flex">
      <TouchableOpacity>
        <Image
          source={icons.heart_fill}
          className="w-5 h-5 absolute top-2 right-1"
        />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 font-pregular">{service?.title}</Text>
        <Text className="text-gray-600 text-lg mr-2">{service?.posted}</Text>
        <View className="flex-row mt-4">
          <Image
            source={icons.user}
            className="w-5 h-5 mr-2 mt-1"
          />
        <Text className="text-gray-600 text-lg mr-2">By: {service?.name}</Text>
          {
            Array.from({length: 4}).map((_, index) => (
              <Image
                key={`star-${index}`}
                source={icons.star}
                className="w-4 h-4 mt-1"
              />
            ))
          }
        </View>
        <View className="flex">
          <View className="flex-row">
          <Image
            source={icons.money}
            className="w-5 h-5 mr-2 mt-1"
          />
          <Text className="text-gray-600 text-lg mr-2">Charge: Rs.{service?.charge}</Text>
          </View>
        </View>
      </View>
      <View className="flex mt-4 relative">
          <Text className="text-black text-lg font-bold mt-4">Comments or Questions</Text>
            <FormField
            value={questions}
            handleChangeText={(e) => setQuestions(e)}
            otherStyles=""
          />
      </View>
      <View className="flex mt-4 relative">
          <Text className="text-black text-lg font-bold mt-4">Your Quotation</Text>
            <FormField
            value={questions}
            handleChangeText={(e) => setQuestions(e)}
            otherStyles=""
            keyboardType={"numeric"}
          />
      </View>
    <View>
    <View className="flex flex-row mt-4 w-full justify-between">
        <CustomButton
            title="Cancel"
            containerStyles="flex-1 mr-2"
            icon={icons.calendar}
            handlePress={()=>router.push('/servicetabs/home')}
        />
        <CustomButton
            title="Apply"
            containerStyles="flex-1 ml-2 bg-green-400"
            icon={icons.clock}
            handlePress={()=>null}
        />
      </View>
    </View>
    </View>
    </ScrollView>
  )
}

export default Request