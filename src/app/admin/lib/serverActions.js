'use server'
import { revalidatePath } from "next/cache"
import { prisma } from "./prisma"
import { redirect } from "next/navigation"



export async function createRouteWithTrips(formData) {
    const data = {
        from: (formData.get('from')),
        to: (formData.get('to')),
    }
    const route = await prisma.route.create({ data })

    const scheduleData = formData.get('schedule')
    const schedule = JSON.parse(scheduleData)
    for (const [date, times] of Object.entries(schedule)) {
        for (const time of times) {
            await prisma.trip.create({
                data: {
                    date: new Date(date),  // "2026-04-21" → Date объект
                    time: time,            // "08:00"
                    routeId: route.id      // связь с маршрутом
                }
            })
        }
    }
    revalidatePath('/admin/')
    redirect('/admin/')
}
