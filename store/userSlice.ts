import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {User, Service} from '@/constants/types';

const initialState:User = {
    id: 0,
    name: 'Rudra Pokhrel',
    email: '',
    category: 'Electrician',
    phoneNumber: '',
    address: 'kathmandu',
    profileImage: '',
    bookedServices: [],
    rating: 4,
    services: [],
    description: 'Specialist in electrical wiring and installation of electrical appliances. I have been working in this field for 5 years. I can provide services in Kathmandu valley. I am available from 9 am to 5 pm.',
    requests: [{type:"Plumber",id:1, name:"Prakash Adhikari", location:"Kathmandu", service:"Plumber", description:"There's a leakage from ceiling in my home from past few days", charge:1000,posted:"1 mins ago",title:"Plumber needed for leakage fix"}]
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.category = action.payload.category;
      state.bookedServices = action.payload.bookedServices;
      state.id = action.payload.id;
      state.phoneNumber = action.payload.phoneNumber;
      state.profileImage = action.payload.profileImage;
      state.rating = action.payload.rating;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.address = '';
      state.bookedServices = [];
      state.id = 0;
      state.phoneNumber = '';
      state.profileImage = '';
      state.category = '';
    },
    addBookedState: (state, action) => {
      state.bookedServices.push(action.payload);
    },
    addRequests: (state, action) => {
      state.requests.push(action.payload);
    }
  },
});

export const { setUser, clearUser, addBookedState } = userSlice.actions;
export default userSlice.reducer;