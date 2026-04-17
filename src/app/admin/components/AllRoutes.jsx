import React from 'react'
import { prisma } from '../lib/prisma'

export default async function AllRoutes() {
  const routes = await prisma.route.findMany({
    include: {
      trips: true
    }
  })
  return (
    <div>
      {routes.map((route) => (
        <div key={route.id}>
          <p>Рейс:</p>
          <p>Откуда: {route.from}</p>
          <p>Куда: {route.to}</p>

          <div>
            {route.trips.map((trip) => (
              <div key={trip.id}>
                <p>Дата: {new Date(trip.date).toLocaleDateString()}</p>
                <p>Время: {trip.time}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
