'use server'

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'

// фиксированные рейсы
const ROUTES = [
  {
    from: 'Ростов-на-Дону',
    to: 'Волгодонск',
    times: ['09:00', '15:30']
  },
  {
    from: 'Волгодонск',
    to: 'Ростов-на-Дону',
    times: ['12:00', '18:30']
  }
]

// создать расписание на 14 дней
export async function seedTrips() {
  const routeList = await prisma.route.findMany()

  if (routeList.length === 0) {
    for (const r of ROUTES) {
      const route = await prisma.route.create({
        data: { from: r.from, to: r.to }
      })

      for (let i = 0; i < 14; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)

        for (const time of r.times) {
          await prisma.trip.create({
            data: {
              date,
              time,
              routeId: route.id
            }
          })
        }
      }
    }
  }
}

// бронь места
export async function bookSeat({ tripId, seatKey, email }) {
  const seat = await prisma.seat.findFirst({
    where: { tripId, seatKey }
  })

  if (seat?.booked) {
    throw new Error('Место уже занято')
  }

  return prisma.seat.create({
    data: {
      tripId,
      seatKey,
      booked: true,
      email
    }
  })
}