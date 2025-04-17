"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";

import { Meme } from "@/types/meme";
import { fetchMemes } from "@/services/memeService";

export default function ListPage() {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMemes = async () => {
            try {
                setLoading(true);
                const data = await fetchMemes();

                setMemes(data);
                setError(null);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("Failed to load memes. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadMemes();
    }, []);

    if (loading) return <div className="text-center py-8">Loading memes...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

    return (
        <div className="px-4">
            <h1 className="text-large font-bold mb-4">Memes Gallery</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {memes.map(meme => (
                    <Card key={meme.id} className="max-w-full ">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <h4 className="font-bold text-medium mb-2 text-black/80">{meme.name}</h4>
                        </CardHeader>
                        <CardBody className="py-2 overflow-visible">
                            <Image
                                alt={meme.name}
                                className="object-cover rounded-xl w-full h-[200px]"
                                src={meme.imageUrl}
                            />
                        </CardBody>
                        <CardFooter className="flex justify-between">
                            <div className="text-sm">❤️ {meme.likes} likes</div>
                            <Link className="text-sm" href={meme.imageUrl} rel="noopener noreferrer" target="_blank">
                                View Original
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
