import { Key, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from "react-native";
import { StyleSheet } from "react-native";

import { icons } from "../constants";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}:FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View className={`space-y-2 mt-6 px-4 ${otherStyles}}`}>
      <Text className="text-lg font-pregular text-gray-600">{title}</Text>

      <View className="w-full h-8 bg-white-100 rounded-2xl flex flex-row items-center">
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
          secureTextEntry={placeholder === "Password" && !showPassword}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {placeholder === "Password" && (
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
