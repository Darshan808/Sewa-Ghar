import { ImageSourcePropType } from "react-native"

interface Service {
    id: number,
    name: string,
    image: ImageSourcePropType
}

interface BookedService {
    id: number,
    name: string,
    date: string,
    time: string,
    location: string,
    serviceCharge: number,
    description?: string,
    providerInfo?: {
        name: string,
        contact: string
    },
    customerInfo?: {
        name: string,
        contact: string
    },
    status?: string,
    duration?: string,
    notes?: string,
    paymentStatus?: string,
    contactInfo?: string,
    bookingReference?: string,
    discounts?: number,
    rating?: number,
    feedback?: string
}

//User
interface User {
    id: number,
    name: string,
    email: string,
    category: string,
    phoneNumber: string,
    address: string,
    profileImage?: string,
    bookedServices: BookedService[],
    rating: number,
    description: string,
    services: Service[]
}


export type { User, Service, BookedService }