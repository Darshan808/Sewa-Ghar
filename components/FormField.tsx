import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black-100 font-pmedium px-4">{title}</Text>

      <View className="w-full h-12 px-4 bg-white-100 rounded-2xl flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          style={[
            styles.input,
            focused && styles.inputFocused
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {placeholder==="reply" && (
          <TouchableOpacity onPress={() => null}>
            <Image
              source={icons.send}
              className="w-6 h-6 ml-4"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderColor: '#e5e5e5', // Equivalent to border-black-200
    flex: 1,
  },
  inputFocused: {
    borderColor: '#ff5733', // Replace with your secondary color
  },
})

export default FormField;
