import air_conditioner from '@/assets/images/services/air-conditioner.png';
import barber from '@/assets/images/services/barbershop.png';
import carpenter from '@/assets/images/services/carpenter.png';
import makeup from '@/assets/images/services/makeup.png';
import plumber from '@/assets/images/services/leak.png';
import painter from '@/assets/images/services/varnish.png';
import move_home from '@/assets/images/services/moving-truck.png';
import electrician from '@/assets/images/services/electrician.png';
import {type Service} from '@/constants/types';

const services:Service[] = [
    {
        id: 1,
        name: "Electrician",
        image: electrician,
    },
    {
        id: 2,
        name: "Plumber",
        image: plumber,
    },
    {
        id: 3,
        name: "Carpenter",
        image: carpenter,
    },
    {
        id: 4,
        name: "Painter",
        image: painter,
    },
    {
        id: 5,
        name: "Barber",
        image: barber,
    },
    {
        id: 6,
        name: "Makeup",
        image: makeup,
    },
    {
        id: 7,
        name: "Air Conditioner",
        image: air_conditioner,
    },
    {
        id: 8,
        name: "Move Home",
        image: move_home,
    }
]

export default services;