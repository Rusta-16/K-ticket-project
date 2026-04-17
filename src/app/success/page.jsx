'use client'

import { useEffect } from "react"

export default function SuccessPage() {

    useEffect(() => {
        const sendTicket = async () => {

            const data = JSON.parse(localStorage.getItem("ticketData"))

            if (!data) return

            await fetch('/api/payment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }

        sendTicket()
    }, [])

    return (
        <div>
            <h1>Оплата прошла успешно 🎉</h1>
            <p>Билет отправлен на почту</p>
        </div>
    )
}