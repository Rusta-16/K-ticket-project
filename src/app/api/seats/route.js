let db = {}; // временная память (сбросится при перезапуске)

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    return Response.json(db[key] || []);
}

export async function POST(req) {
    const { key, seats } = await req.json();

    if (!db[key]) db[key] = [];

    db[key] = [...new Set([...db[key], ...seats])];

    return Response.json({ success: true });
}