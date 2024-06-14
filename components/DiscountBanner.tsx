import { View, Text, Image, FlatList } from 'react-native'
import { useEffect, useRef, useState } from 'react';
import {images} from "../constants";

const discountImages = [
  images.discount,
  images.discount2,
  images.discount3,
]

const DiscountBanner = () => {
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setIndex((prevIndex) => {
  //       const nextIndex = prevIndex + 1;
  //       flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex % discountImages.length });
  //       return nextIndex;
  //     });
  //   }, 3000); // Change image every 3 seconds

  //   return () => clearInterval(timer);
  // }, []);
  return (
    <View className="mt-4">
      <FlatList
        data={discountImages}
        ref={flatListRef}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
            <Image
                source={item}
                className="h-40 w-80 mr-4 rounded-lg shadow-lg"
                resizeMode="contain"
            />
        )}
      />
    </View>
  )
}

export default DiscountBanner