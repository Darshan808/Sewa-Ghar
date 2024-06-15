import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'

interface ServiceCardProps {
    name: string,
    image: ImageSourcePropType,
    onPress: () => void
}

const ServiceCard = ({name, image, onPress}:ServiceCardProps) => {
  return (
    <View className="w-24 h-24 bg-white rounded-2xl border-secondary flex-1 m-2 justify-center items-center p-4 rounded-lg shadow-lg">
      <TouchableOpacity 
        onPress={onPress}
        className="flex flex-col items-center justify-center h-full relative"
      >
        <Image 
            source={image} 
            className="w-10 h-10 top-2"
        />
        {
        (name.split(' ').length > 1) ? <Text className="text-sm mt-3 text-black text-center w-full">{name.split(' ')[0]+'\n'+(name.split(' ')[1])}</Text>:
        <Text className="text-sm mt-3 text-black text-center w-full">{name}</Text>
        }
      </TouchableOpacity>
    </View>
  )
}

export default ServiceCard