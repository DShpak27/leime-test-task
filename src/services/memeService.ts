import Cookies from "js-cookie";

import { Meme } from "@/types/meme";

export const fetchMemes = async (): Promise<Meme[]> => {
    try {
        const response = await fetch("/api/memes");

        if (!response.ok) {
            throw new Error("Failed to fetch memes");
        }

        return await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        const storedMemes = Cookies.get("memes");

        if (storedMemes) {
            try {
                return JSON.parse(storedMemes);
            } catch {
                return [];
            }
        }

        return [];
    }
};

export const updateMeme = async (meme: Meme): Promise<Meme> => {
    try {
        const response = await fetch(`/api/memes/${meme.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(meme),
        });

        if (!response.ok) {
            throw new Error("Failed to update meme");
        }

        const allMemes = await fetchMemes();
        const updatedMemes = allMemes.map(m => (m.id === meme.id ? meme : m));

        Cookies.set("memes", JSON.stringify(updatedMemes));

        return await response.json();
    } catch (error) {
        throw error;
    }
};
