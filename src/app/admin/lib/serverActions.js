'use server'
import { revalidatePath } from "next/cache"
import { prisma } from "./prisma"
import { redirect } from "next/navigation"


export async function createRouteWithTrips(formData) {
    const from = formData.get('from')
    const to = formData.get('to')
    const scheduleRaw = formData.get('schedule')

    if (!from || !to || !scheduleRaw) {
        throw new Error('Missing data')
    }

    const schedule = JSON.parse(scheduleRaw)

    const route = await prisma.route.create({
        data: { from, to }
    })

    for (const [date, times] of Object.entries(schedule)) {
        for (const time of times) {
            await prisma.trip.create({
                data: {
                    date: new Date(date),
                    time,
                    routeId: route.id
                }
            })
        }
    }

    revalidatePath('/admin')
    redirect('/admin')
}
