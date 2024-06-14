import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { icons } from '@/constants';
import { type Request } from '@/constants/types';

interface RequestCardProps {
  item: Request,
    onPress: () => void
}

const RequestCard = ({ item, onPress }: RequestCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="bg-white flex-1 rounded-lg shadow-lg p-4 m-2 relative">
      <View className="flex border-b border-gray-200 pb-2">
        <TouchableOpacity>
          <Image
            source={icons.heart_fill}
            className="w-5 h-5 absolute top-2 right-1"
          />
        </TouchableOpacity>
        <Text className="text-gray-400 text-sm">Posted {item.posted}</Text>
        <Text className="text-lg font-bold text-gray-900">{item.title}</Text>
        <Text className="text-gray-600 text-sm">{item.name}</Text>
        <Text className="text-black font-bold mt-4 mb-1">{item.description}</Text>
      </View>
    <View className="pt-2 flex flex-row justify-between">
      <View className="flex">
        <Text className="text-gray-900 text-sm">Location: {item.location}</Text>
        <Text className="text-gray-900 text-sm">Charge: Rs.{item.charge}</Text>
      </View>
      <Text className="text-secondary mt-4">Show Details</Text>
    </View>
    </TouchableOpacity>
  );
}

export default RequestCard;