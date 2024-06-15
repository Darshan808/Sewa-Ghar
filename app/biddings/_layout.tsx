import { Stack } from "expo-router";
import { View, Text } from 'react-native'
import React from 'react'

const BiddingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{headerShown: false}} />
    </Stack>
  )
}

export default BiddingsLayout;