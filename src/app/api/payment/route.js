import { NextResponse } from "next/server"
import crypto from "crypto"
import nodemailer from "nodemailer"
import { PDFDocument, StandardFonts } from "pdf-lib"
import QRCode from "qrcode"

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
export async function PUT(req) {
    try {
        const data = await req.json()

        // ================= PDF =================
        const pdfDoc = await PDFDocument.create()
        const page = pdfDoc.addPage([400, 600])
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

        let y = 550

        function draw(text) {
            page.drawText(text, { x: 50, y, size: 12, font })
            y -= 20
        }

        draw("БИЛЕТ 🎫")
        draw(`ФИО: ${data.fio}`)
        draw(`Маршрут: ${data.from} → ${data.to}`)
        draw(`Дата: ${data.date}`)
        draw(`Время: ${data.time}`)
        draw(`Места: ${data.seats.join(', ')}`)
        draw(`Цена: ${data.price} руб`)

        // QR
        const qrText = `${data.fio} | ${data.from} → ${data.to} | ${data.date} | ${data.time}`
        const qrImage = await QRCode.toDataURL(qrText)

        const qrBytes = await fetch(qrImage).then(res => res.arrayBuffer())
        const qrEmbed = await pdfDoc.embedPng(qrBytes)

        page.drawImage(qrEmbed, {
            x: 120,
            y: y - 150,
            width: 150,
            height: 150
        })

        const pdfBytes = await pdfDoc.save()

        // ================= EMAIL =================
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "K-plus-bilet.2026@yandex.ru",
            subject: "Новый билет 🎫",
            text: "Во вложении билет",
            attachments: [
                {
                    filename: "ticket.pdf",
                    content: Buffer.from(pdfBytes)
                }
            ]
        })

        return NextResponse.json({ success: true })

    } catch (e) {
        console.error(e)
        return NextResponse.json({ success: false, error: e.message })
    }
}