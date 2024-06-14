import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'

interface ServiceCardProps {
    name: string,
    image: ImageSourcePropType,
    onPress: () => void
}

const ServiceCard = ({name, image, onPress}:ServiceCardProps) => {
  return (
    <View className="w-20 h-20 bg-white rounded-2xl border-secondary flex-1 m-2 justify-center items-center p-4 rounded-lg shadow-lg">
      <TouchableOpacity 
        onPress={onPress}
        className="flex flex-col items-center justify-center h-full relative"
      >
        <Image 
            source={image} 
            className="w-10 h-10 top-2"
        />
        <Text className="text-sm mt-3 text-black text-center">{name}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ServiceCard