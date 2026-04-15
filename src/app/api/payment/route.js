import { NextResponse } from "next/server"
import crypto from "crypto"

function generateToken(payload, password) {
    // Правильный порядок полей согласно документации Т-Банка
    const params = {
        Amount: payload.Amount,
        Description: payload.Description,
        OrderId: payload.OrderId,
        Password: password,
        TerminalKey: payload.TerminalKey
    }

    // Сортируем ключи по алфавиту и формируем строку
    const sortedKeys = Object.keys(params).sort()
    let string = ''
    for (const key of sortedKeys) {
        if (params[key] !== undefined && params[key] !== null) {
            string += params[key]
        }
    }

    return crypto
        .createHash("sha256")
        .update(string)
        .digest("hex")
}

export async function POST(req) {
    try {
        const body = await req.json()

        // Используем тестовые ключи из документации
        const terminalKey = "1775577883017"
        const password = "z_%xYMUu!Kt$oEaE"

        // Сначала формируем payload БЕЗ токена
        const payloadWithoutToken = {
            TerminalKey: terminalKey,
            Amount: body.amount, // сумма в копейках
            OrderId: body.orderId,
            Description: body.description,
        }

        // Генерируем токен
        const token = generateToken(payloadWithoutToken, password)

        // Добавляем токен и остальные поля
        const payload = {
            ...payloadWithoutToken,
            Token: token,
            DATA: {
                Email: body.email,
                Phone: body.phone,
            },
            Receipt: {
                Email: body.email,
                Phone: body.phone,
                Taxation: "osn",
                Items: [
                    {
                        Name: body.description,
                        Price: body.amount,
                        Quantity: 1,
                        Amount: body.amount,
                        Tax: "none",
                        PaymentMethod: "full_payment",
                        PaymentObject: "service"
                    },
                ],
            },
        }

        console.log('Отправляемый payload:', JSON.stringify(payload, null, 2))

        const res = await fetch("https://securepay.tinkoff.ru/v2/Init", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const data = await res.json()
        console.log('Ответ от Т-Банка:', data)

        if (data.Success) {
            return NextResponse.json({
                success: true,
                paymentUrl: data.PaymentURL,
            })
        }

        return NextResponse.json(
            {
                success: false,
                error: data.Message,
                raw: data,
            },
            { status: 400 }
        )
    } catch (e) {
        console.error('Ошибка сервера:', e)
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 }
        )
    }
}