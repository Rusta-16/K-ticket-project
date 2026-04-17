
import React from 'react';
import { prisma } from '../admin/lib/prisma';
import MapPage from './MapPage';

export default async function TimeTrip() {
    const city = await prisma.trip.findMany({
        include: {
            route: true,
        },
    });
    console.log(city)
    const from = city.filter(trip => trip.route.from === 'Ростов-на-дону');
    const to = city.filter(trip => trip.route.to === 'Волгодонск');

    const initialSelectedLocation = [
        {
            location: 'Ростов-на-дону',
            time: from.flatMap(t => t.time || []),
        },
        {
            location: 'Волгодонск',
            time: to.flatMap(t => t.time || []),
        }
    ];

    return <MapPage initialSelectedLocation={initialSelectedLocation}/>;
}