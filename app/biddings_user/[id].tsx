import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React from 'react'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { useLocalSearchParams } from 'expo-router'
import {images, icons} from '@/constants'
import { CustomButton, FormField } from '@/components'
import { useState } from 'react'

const AllBidings = () => {
    const [showModel, setShowModel] = useState(false);
  const user = useSelector((state:RootState)=>state.user);
  const params = useLocalSearchParams();
  const serviceId = parseInt(params["id"] as string);
  const service = user.bookedServices.filter((bs)=>bs.id===serviceId)[0];
    const getTextColor = (status:string):string => {
        switch (status) {
        case 'Confirmed':
            return 'text-green-500';
        case 'Pending':
            return 'text-orange-500';
        case 'Rejected':
            return 'text-red-500';
        default:
            return 'text-gray-500';
        }
    }
  return (
    <ScrollView>
    <View className="w-[90vw] bg-white rounded-2xl mt-12 mx-auto p-4 shadow-lg flex">
        <View className="flex felx-1 flex-row justify-between items-center">
          <View className="flex-1">
            <View className="flex flex-col items-start justify-start">
              <Text className="text-xl text-black font-bold mb-2">{service.title}</Text>
              <Text className="text-sm text-gray-800 mb-1">Date: {service.date}</Text>
              <Text className="text-sm text-gray-800 mb-1">Time: {service.time}</Text>
              <Text className="text-sm text-gray-800 mb-1">Location: {service.location}</Text>
              <Text className="text-sm text-gray-800 mb-1">Charge: Rs {service.serviceCharge}</Text>
              <Text className="text-sm text-gray-800 mb-1">
                Status:{' '}
                <Text className={`text-sm font-semibold ${getTextColor(service.status as string)}`}>{service.status}</Text>
              </Text>
            </View>
          </View>
          <Image
            source={require('@/assets/images/services/leak.png')}
            className="w-20 h-20 mr-4"
          />
        </View>
          <View className="flex-1 justify-center items-center">
    </View>
    <Modal
      visible={showModel}
      animationType="slide"
    >
      <View className="flex-1 px-4 mt-10 items-center bg-opacity-50">
        <View className=" flex border-secondary bg-gray-50 border-1 px-2 rounded-lg py-4 mb-4">
            <View className=" flex flex-row justify-between w-full">
            <Image source={images.service_profile} className="w-8 h-8 mr-2"/>
            <Text className="font-pregular text-lg font-bold mt-1">{"Hari Prasad"}</Text>
                <View className="ml-auto flex flex-row" >
                    {
                        Array.from({length: 4}).map((_, index) => (
                        <Image
                            key={`star-${index}`}
                            source={icons.star}
                            className="w-4 h-4 mt-2"
                        />
                        ))
                    }
                    <Text className="text-sm text-gray-400 ml-2 mt-1 mr-2">{`4/5`}</Text>
                </View>
            </View>
            <View>
                <Text className="text-gray-600 mt-4 text-lg mt-8">
             I am an expert in plumbing services. I have repaired similar such problems in my past services. I can provide good value.
                  
                  </Text>
            </View>
            <View className="flex mt-8">
                <Text className="text-black text-lg font-bold"></Text>
                <View className="bg-green-50 py-3 rounded-lg">
                    <View className="flex flex-row">
                        <Image source={icons.user} className="h-4 w-4 ml-4 mr-2 mt-4"/>
                    <Text className="text-gray-600 font-pregular text-lg font-semibold mt-2">I'll be there by 4 PM.</Text>
                    </View>
                    <FormField placeholder={"reply"} />
                </View>
            </View>
        <View className="flex flex-row justify-between mt-8 pl-1">
            <Text className="text-black text-lg font-bold">Base Charge: {' '}</Text>
            <Text className="text-secondary text-lg font-bold">Rs 1000</Text>
        </View>
        <View className="flex flex-row justify-between mt-2">
            <Text className="text-black text-lg font-bold"> Their Counter Offer: {' '}</Text>
            <Text className="text-green-500 text-lg font-bold">Rs 1200</Text>
        </View>

        <View className="flex-1 rounded-lg px-2 mt-8">
          <View className="flex-row justify-between">
            <CustomButton 
              containerStyles="bg-green-500 px-6 rounded-lg" 
              textStyles='text-sm'
              handlePress={()=>{ service.status = 'Confirmed';
                setShowModel(false)
              }}
              title='Accept'
              icon={icons.accept}
            />
            <CustomButton 
              containerStyles="bg-red-500 px-6 rounded-lg" 
              handlePress={()=>{
                setShowModel(false)}}
              textStyles='text-sm'
                title='Cancel'
                icon={icons.cancel}
            />
          </View>
        </View>
      </View>
              </View>
    </Modal>
        <View className="flex flex-col items-start justify-start">
              <Text className="text-xl text-black font-bold mb-2 mt-6 mb-8">Applications: </Text>
              <View>
                {  Array.from({length: 1}).map((_, index) => (
                        <TouchableOpacity onPress={()=>{
                          setShowModel(true)
                          }}  key={index}>
                        <View className=" flex border-secondary bg-gray-50 border-1 px-2 rounded-lg py-4 mb-4">
                            <View className=" flex flex-row justify-between w-full">
                            <Image source={images.user_avatar} className="w-8 h-8 mr-2"/>
                            <Text className="font-pregular font-bold mt-1">Hari Prasad</Text>
                                <View className="ml-auto flex flex-row" >
                                    {
                                        Array.from({length: 5}).map((_, index) => (
                                        <Image
                                            key={`star-${index}`}
                                            source={icons.star}
                                            className="w-4 h-4 mt-2"
                                        />
                                        ))
                                    }
                                    <Text className="text-sm text-gray-400 ml-2 mt-1 mr-2">5/5</Text>
                                </View>
                            </View>
                                <Text className="text-gray-400 ml-10">I am an expert in plumbing services.</Text>
                            <View className="flex flex-row w-full">
                                <Text className="text-gray-400 text-sm ml-10">Charge: Rs.1000</Text>
                                <Text className="text-green-500 text-sm ml-auto mr-2 underline">View more</Text>
                            </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
            </View>
    </View>
    </ScrollView>
  )
}

export default AllBidings