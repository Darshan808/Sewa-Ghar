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
import { useDispatch } from "react-redux";
import { addBookedState } from "@/store/userSlice";

interface FormProps {
  title:string,
  description:string;
  price:number|null;
  date?:Date | string;
  time?:Date | string;
  video?: string;
  image?: string;
  isUrget:boolean;
}

const Create = () => {
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const serviceId = parseInt(params["id"] as string);
  const service = services.find((s) => s.id === serviceId);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormProps>({
    title:"",
    description: "",
    price: null,
    date: "",
    time: "",
    video: "",
    image: "",
    isUrget: false

  });
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
    form.time = currentDate.getHours() + ':' + currentDate.getMinutes();
    form.date = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate();
    setDisplayDate(currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate());
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
      (form.title === "") ||
      (form.description === "")
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
      const {title, description, price, date, time, isUrget} = form; 
      const data = {
        id: Math.floor(Math.random() * 1000),
        type: service?.name,
        title:title,
        description,
        serviceCharge:price,
        date,
        time,
        status: 'Pending',
        location: 'Kathmandu',
      }
      console.log(data);
      
      dispatch(addBookedState(data));
      router.push("/booked");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title:"",
        description: "",
        price: null,
        date: "",
        time: "",
        video: "",
        image: "",
        isUrget: false
      });
      setDate(new Date());
      setDisplayDate('');
      setDisplayTime('');
      setShowDateTime(false);
    }

      setUploading(false);
    }

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
          title="Title"
          value={form.title}
          placeholder=""
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-4"
        />
        <FormField
          title="Description"
          value={form.description}
          placeholder=""
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-4"
        />
        <FormField
          title="Price"
          value={form.price}
          placeholder=""
          handleChangeText={(e) => setForm({ ...form, price: e })}
          otherStyles="mt-4"
        />
          <View className="flex flex-row items-center px-4 mt-4">
            <Text className="text-lg font-pregular text-gray-600">Urgent Service:</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={form.isUrget ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=>setForm({...form, isUrget: !form.isUrget})}
                value={form.isUrget}
            />
            {/* Add more options as needed */}
        </View>
        <View className="flex flex-row mt-4 px-2 w-full justify-between">
        <CustomButton
            title={showDateTime ? displayDate : 'Select Date'}
            containerStyles={`flex-1 mr-2 h-4 ${form.isUrget ? 'bg-blue-200' : 'bg-blue-400'}`}
            textStyles="font-pregular"
            icon={icons.calendar}
            handlePress={()=>handleDateTime('date')}
        />
        <CustomButton
            title={showDateTime ? displayTime : 'Select Time'}
            containerStyles={`flex-1 h-4 ${form.isUrget ? 'bg-orange-200' : 'bg-orange-400'}`}
            textStyles="font-pregular"
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
        {/* <View className="mt-7 space-y-2">
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
        </View> */}

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
