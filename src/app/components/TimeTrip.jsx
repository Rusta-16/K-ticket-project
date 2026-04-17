
import React from 'react';
import MapPage from './MapPage';

export default function TimeTrip() {
    const initialSelectedLocation = [
        {
            location: 'Ростов-на-дону',
            time:['8:00'],
        },
        {
            location: 'Волгодонск',
            time:['10:00']
        }
    ];

    return <MapPage initialSelectedLocation={initialSelectedLocation}/>;
}