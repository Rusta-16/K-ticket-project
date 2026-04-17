// app/api/ticket/route.ts
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { createTransport } from "nodemailer";

export async function PUT(req) {
  try {
    const data = await req.json();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 550;

    function draw(text) {
      page.drawText(text, { x: 50, y, size: 12, font });
      y -= 20;
    }

    draw("БИЛЕТ 🎫");
    draw("ФИО: " + data.fio);
    draw("Маршрут: " + data.from + " → " + data.to);
    draw("Дата: " + data.date);
    draw("Время: " + data.time);
    draw("Места: " + data.seats.join(", "));
    draw("Цена: " + data.price + " руб");

    const pdfBytes = await pdfDoc.save();

    // == EMAIL ==
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "K-plus-bilet.2026@yandex.ru",
      subject: "Новый билет 🎫",
      text: "Во вложении билет",
      attachments: [
        {
          filename: "ticket.pdf",
          content: Buffer.from(pdfBytes),
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}