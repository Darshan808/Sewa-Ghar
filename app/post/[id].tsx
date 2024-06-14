import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch
} from "react-native";
import { icons } from "../../constants";
import { CustomButton, FormField } from "../../components";
import services from "@/constants/services";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";

const Create = () => {
  const params = useLocalSearchParams();
  const serviceId = parseInt(params["id"] as string);
  const service = services.find((s) => s.id === serviceId);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const [isUrgent,setIsUrgent] = useState(false);
  const toggleSwitch = () => setIsUrgent(previousState => !previousState);
  const [date, setDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState<string>(''); 
  const [displayTime, setDisplayTime] = useState<string>(''); 
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showDateTime, setShowDateTime] = useState(false);

  const handleDateTime = (type:'time' | 'date') => {
    setMode(type);
    setShow(true);
  }
  const onChange = (event,SelectedDate:Date)=>{
    setShow(false);
    const currentDate = SelectedDate || date;
    setDate(currentDate);
    setDisplayDate(currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear())
    setDisplayTime(currentDate.getHours() + ':' + currentDate.getMinutes())
    if(SelectedDate) setShowDateTime(true);
  }


  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (form.prompt === "") |
      (form.title === "") |
      !form.thumbnail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      // await createVideoPost({
      //   ...form,
      //   // userId: user.$id,
      // });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <View className="flex justify-between items-center flex-row mb-6">
          <TouchableOpacity onPress={() => router.push('/home')} className="flex flex-row gap-3">
            <Image
              source={icons.leftArrow}
              className="w-6 h-6"
              resizeMode="contain"
            />
            <Text className="text-xl text-black font-pregular">Back</Text>
          </TouchableOpacity>
        </View>   
        <Text className="text-2xl text-black font-psemibold">Create a <Text className="text-secondary">{service?.name}</Text> service request</Text>
        <FormField
          title="Name"
          value={form.title}
          placeholder=""
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-6"
        />
        <FormField
          title="Phone Number"
          value={form.title}
          placeholder=""
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-4"
          keyboardType="phone-pad"
        />
        <FormField
          title="Address"
          value={form.title}
          placeholder=""
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-4"
        />
        <FormField
          title="Discription of service"
          value={form.title}
          placeholder=""
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-4"
        />
        <View className="flex flex-row mt-4 w-full justify-between">
        <CustomButton
            title={showDateTime ? displayDate : 'Select Date'}
            containerStyles="flex-1 mr-2 bg-blue-400"
            icon={icons.calendar}
            handlePress={()=>handleDateTime('date')}
        />
        <CustomButton
            title={showDateTime ? displayTime : 'Select Time'}
            containerStyles="flex-1 ml-2"
            icon={icons.clock}
            handlePress={()=>handleDateTime('time')}
        />
        {show && (
            <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
            />
            
        )}
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-black-100 font-pmedium">
            Upload Video if necessary
          </Text>

           <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-gray-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-black-100 font-pmedium">
            Upload Image if necessay
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-gray-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-black-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center">
            <Text className="text-base text-black-100 font-pmedium">Urgent Service:</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isUrgent ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isUrgent}
            />
            {/* Add more options as needed */}
        </View>

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
