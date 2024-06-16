import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { BookedService } from '@/constants/types';
import services from '@/constants/services';

interface BookedServiceCardProps{
    item: BookedService;
    onPress: ()=>void;
}

const getTextColor = (status: string) => {
    if (status === 'Confirmed') {
        return 'text-green-600';
    } else if(status === 'Cancelled') {
        return 'text-red-600';
    } else {
        return 'text-orange-500'
    }
}

const getImage = (name: string):ImageSourcePropType => {
  return services.filter((service) => service.name === name)[0].image;
}

const BookedServiceCard = ({item, onPress }: BookedServiceCardProps) => {
 console.log(item);
  return (
    <View className="w-[90vw] bg-white rounded-2xl border-2 border-orange-400 m-2 p-4 shadow-lg">
      <TouchableOpacity 
        onPress={onPress}
        className="flex flex-col justify-between relative"
      >
        <View className="flex flex-row justify-between items-center">
          <View className="flex-1">
            <View className="flex flex-col items-start justify-start">
              <Text className="text-xl text-black font-bold mb-2">{item.title}</Text>
              <Text className="text-sm text-gray-800 mb-1">Date: {item.date}</Text>
              <Text className="text-sm text-gray-800 mb-1">Time: {item.time}</Text>
              <Text className="text-sm text-gray-800 mb-1">Location: {item.location}</Text>
              <Text className="text-sm text-gray-800 mb-1">Charge: Rs {item.serviceCharge}</Text>
              <Text className="text-sm text-gray-800 mb-1">
                Status:{' '}
                <Text className={`text-sm font-semibold ${getTextColor(item.status as string)}`}>{item.status}</Text>
              </Text>
            </View>
          </View>
          <Image
            source={getImage(item.type)}
            className="w-20 h-20 mr-4"
          />
        </View>
        <View className="flex items-end flex-row mt-2 ml-auto">
          <Text className="text-gray-600 text-sm">Tap for details</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BookedServiceCard;
