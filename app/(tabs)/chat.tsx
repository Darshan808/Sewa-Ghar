import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { icons } from '@/constants';
import * as DocumentPicker from 'expo-document-picker';

const Chat = () => {
    const [uploaded_img, setUploadedImg] = useState<any>(null);
  const [messages, setMessages] = useState([
    { id: '1', text: 'How can i assist you?', sender: 'other' },
  ]);
  const [inputText, setInputText] = useState('');
  const customReply = "Clam down, you are in a right place. Sewa Ghar provides you with the best services. You can fill the form requesting a pulmbing service from which can help you to get the best service."
  
  const handleSend = () => {
    if (inputText.trim()) {
      setMessages((messages) => ([...messages, { id: Date.now().toString(), text: inputText, sender: 'me' }]));
      setTimeout(() => {
          setMessages((messages) => ([...messages, { id: Date.now().toString(), text: customReply, sender: 'other' }]));
      },3000)
      setInputText('');
    }
  };



  const renderItem = ({ item }) => (
    <View
      className={`p-3 mt-1 rounded-2xl ${item.sender === 'me' ? 'bg-orange-400 self-end' : 'bg-green-500 self-start'}`}
    >
      <Text className="text-white font-pregular">{item.text}</Text>
    </View>
  );

  return (
    <>
    <View className='flex flex-row justify-center align-center gap-2 w-full pt-10'>
    <Text className="text-2xl font-bold text-center mt-8">Sewa AI</Text>
    <Image source={icons.bot_assistant} className='w-8 h-8'/>
    </View>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#f0f0f0', margin: 10, borderRadius:20, marginTop:8, borderColor: 'orange', borderWidth: 2}}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="flex-1 p-2"
      />
      <View className="flex-row p-4 mb-12 border-t border-gray-200">
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <TouchableOpacity
          onPress={handleSend}
          className="ml-2 pt-3 rounded-lg"
        >
          <Image source={icons.send} className="w-6 h-6" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </>
  );
};

export default Chat;
