"use client";

import { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Button } from "@heroui/button";

import { Meme } from "@/types/meme";
import { EditMemeModal } from "@/components/EditMemeModal";
import { fetchMemes } from "@/services/memeService";

export default function TablePage() {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleEdit = (meme: Meme) => {
        setSelectedMeme(meme);
        setIsModalOpen(true);
    };

    const handleMemeUpdated = (updatedMeme: Meme) => {
        setMemes(memes.map(meme => (meme.id === updatedMeme.id ? updatedMeme : meme)));
    };

    if (loading) return <div className="text-center py-8">Loading memes...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

    return (
        <div className="px-4">
            <h1 className="text-large font-bold mb-4">Memes Table</h1>

            <Table aria-label="Memes table">
                <TableHeader>
                    <TableColumn className="text-center">ID</TableColumn>
                    <TableColumn className="text-center">NAME</TableColumn>
                    <TableColumn className="text-center">LIKES</TableColumn>
                    <TableColumn className="text-center">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {memes.map(meme => (
                        <TableRow key={meme.id} className="hover:bg-zinc-50">
                            <TableCell className="text-center cursor-default">{meme.id}</TableCell>
                            <TableCell className="text-center cursor-default">{meme.name}</TableCell>
                            <TableCell className="text-center cursor-default">{meme.likes}</TableCell>
                            <TableCell className="text-center">
                                <Button color="primary" size="sm" onPress={() => handleEdit(meme)}>
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <EditMemeModal
                isOpen={isModalOpen}
                meme={selectedMeme}
                onMemeUpdated={handleMemeUpdated}
                onOpenChange={setIsModalOpen}
            />
        </div>
    );
}
