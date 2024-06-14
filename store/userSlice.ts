import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {User, Service} from '@/constants/types';

const initialState:User = {
    id: 0,
    name: 'Jon Doe',
    email: '',
    category: 'Electrician',
    phoneNumber: '',
    address: 'kathmandu',
    profileImage: '',
    bookedServices: [],
    rating: 4,
    services: [],
    description: 'Specialist in electrical wiring and installation of electrical appliances. I have been working in this field for 5 years. I can provide services in Kathmandu valley. I am available from 9 am to 5 pm.',
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
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;