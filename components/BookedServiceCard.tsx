import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { BookedService } from '@/constants/types';

interface BookedServiceCardProps extends BookedService {
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

const BookedServiceCard = ({ name, date, time, serviceCharge, location, status, onPress }: BookedServiceCardProps) => {
  return (
    <View className="w-full bg-white rounded-2xl border-2 border-orange-400 flex-1 m-2 p-4 shadow-lg">
      <TouchableOpacity 
        onPress={onPress}
        className="flex flex-col justify-between"
      >
        <View className="flex flex-row justify-between items-center">
          <View className="flex-1">
            <View className="flex flex-col items-start justify-start">
              <Text className="text-xl text-black font-bold mb-2">{name}</Text>
              <Text className="text-sm text-gray-800 mb-1">Date: {date}</Text>
              <Text className="text-sm text-gray-800 mb-1">Time: {time}</Text>
              <Text className="text-sm text-gray-800 mb-1">Location: {location}</Text>
              <Text className="text-sm text-gray-800 mb-1">Charge: ${serviceCharge}</Text>
              <Text className="text-sm text-gray-800 mb-1">
                Status:{' '}
                <Text className={`text-sm font-semibold ${getTextColor(status)}`}>{status}</Text>
              </Text>
            </View>
          </View>
          <Image
            source={require('@/assets/images/services/barbershop.png')}
            className="w-20 h-20 mr-4"
          />
        </View>
        <View className="flex items-end mt-2">
          <Text className="text-gray-600 text-sm">Tap for details</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BookedServiceCard;
