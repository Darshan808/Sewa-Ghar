import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { icons } from '@/constants';

interface RequestCardProps {
    name: string,
    location: string,
    service: string,
    onPress: () => void
}

const RequestCard = ({ name, location, service, onPress }: RequestCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="bg-white flex-1 rounded-lg shadow-lg p-4 m-2 relative">
      <View className="flex border-b border-gray-200 pb-2">
        <TouchableOpacity>
          <Image
            source={icons.heart_fill}
            className="w-5 h-5 absolute top-2 right-1"
          />
        </TouchableOpacity>
        <Text className="text-gray-400 text-sm">Posted 57 mins ago</Text>
        <Text className="text-lg font-bold text-gray-900">Leakage from ceiling</Text>
        <Text className="text-gray-600 text-sm">Darshan Poudel</Text>
        <Text className="text-black font-bold mt-4 mb-1">There's a constant leakage from ceiling from last day. This has been bugging me...</Text>
      </View>
    <View className="pt-2 flex flex-row justify-between">
      <View className="flex">
        <Text className="text-gray-900 text-sm">Location: {location}</Text>
        <Text className="text-gray-900 text-sm">Charge: Rs.1200</Text>
      </View>
      <Text className="text-secondary mt-4">Show Details</Text>
    </View>
    </TouchableOpacity>
  );
}

export default RequestCard;