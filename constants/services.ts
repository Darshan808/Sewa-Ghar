import air_conditioner from '@/assets/images/services/air-conditioner.png';
import barber from '@/assets/images/services/barbershop.png';
import carpenter from '@/assets/images/services/carpenter.png';
import makeup from '@/assets/images/services/makeup.png';
import plumber from '@/assets/images/services/leak.png';
import painter from '@/assets/images/services/varnish.png';
import move_home from '@/assets/images/services/moving-truck.png';
import electrician from '@/assets/images/services/electrician.png';
import vaccum_cleaner from '@/assets/images/services/vacuum-cleaner.png';
import pest_control from '@/assets/images/services/pest-control.png';
import handyman from '@/assets/images/services/handyman.png';
import gardening from '@/assets/images/services/gardening.png';
import construction_worker from '@/assets/images/services/construction-worker.png';
import add from '@/assets/images/services/add.png';
import washing_machine from '@/assets/images/services/washing-machine.png';
import {type Service} from '@/constants/types';

const services:Service[] = [
    {
        id: 0,
        name: "Custom Service",
        image: add,
    },
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
        name: "AC Repairs",
        image: air_conditioner,
    },
    {
        id: 8,
        name: "Shift Home",
        image: move_home,
    },
    {
        id: 9,
        name: "Home Cleaning",
        image: vaccum_cleaner,
    },
    {
        id: 10,
        name: "Pest Control",
        image: pest_control,
    },
    {
        id: 11,
        name: "Handyman",
        image: handyman,
    },
    {
        id: 12,
        name: "Gardening",
        image: gardening,
    },
    {
        id: 13,
        name: "Construction Worker",
        image: construction_worker,
    },
    {
        id: 14,
        name: "Laundry Service",
        image: washing_machine,
    },
]

export default services;