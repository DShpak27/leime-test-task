import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { initialMemes } from "@/data/memes";
import { Meme } from "@/types/meme";

export async function GET() {
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

    return NextResponse.json(memes);
}
