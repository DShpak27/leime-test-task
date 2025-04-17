import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { initialMemes } from "@/data/memes";
import { Meme } from "@/types/meme";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { params } = context;
    const { id } = await params;
    const idNum = parseInt(id);

    const storedMemes = (await cookies()).get("memes")?.value;
    let memes: Meme[] = initialMemes;

    if (storedMemes) {
        try {
            memes = JSON.parse(storedMemes);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error parsing stored memes:", error);
        }
    }

    const meme = memes.find(m => m.id === idNum);

    if (!meme) {
        return NextResponse.json({ error: "Meme not found" }, { status: 404 });
    }

    return NextResponse.json(meme);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { params } = context;
    const { id } = await params;
    const idNum = parseInt(id);
    const body = await req.json();

    const storedMemes = (await cookies()).get("memes")?.value;
    let memes: Meme[] = initialMemes;

    if (storedMemes) {
        try {
            memes = JSON.parse(storedMemes);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error parsing stored memes:", error);
        }
    }

    const memeIndex = memes.findIndex(m => m.id === idNum);

    if (memeIndex === -1) {
        return NextResponse.json({ error: "Meme not found" }, { status: 404 });
    }

    if (body.name && (body.name.length < 3 || body.name.length > 100)) {
        return NextResponse.json({ error: "Name must be between 3 and 100 characters" }, { status: 400 });
    }

    if (body.imageUrl && !isValidUrl(body.imageUrl)) {
        return NextResponse.json({ error: "Image URL is invalid" }, { status: 400 });
    }

    if (body.likes !== undefined && (isNaN(body.likes) || body.likes < 0 || body.likes > 99)) {
        return NextResponse.json({ error: "Likes must be a number between 0 and 99" }, { status: 400 });
    }

    memes[memeIndex] = {
        ...memes[memeIndex],
        ...body,
        id: memes[memeIndex].id,
    };

    (await cookies()).set("memes", JSON.stringify(memes));

    return NextResponse.json(memes[memeIndex]);
}

function isValidUrl(url: string): boolean {
    try {
        new URL(url);

        return url.endsWith(".jpg");
    } catch {
        return false;
    }
}
