
import React from 'react';
import MapPage from './MapPage';
import { form } from 'framer-motion/client';

export default function TimeTrip() {
    const initialSelectedLocation = [
        {
            location: 'Ростов-на-дону',
            time:['9:00','15:30'],
        },
        {
            location: 'Волгодонск',
            time:['12:00','18:30']
        }
    ];

    return <MapPage initialSelectedLocation={initialSelectedLocation}/>;
}