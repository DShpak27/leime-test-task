"use client";

import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import { Meme } from "@/types/meme";
import { updateMeme } from "@/services/memeService";

interface EditMemeModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    meme: Meme | null;
    onMemeUpdated: (meme: Meme) => void;
}

export function EditMemeModal({ isOpen, onOpenChange, meme, onMemeUpdated }: EditMemeModalProps) {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [likes, setLikes] = useState(0);
    const [errors, setErrors] = useState<{
        name?: string;
        imageUrl?: string;
        likes?: string;
    }>({});

    useEffect(() => {
        if (meme) {
            setName(meme.name);
            setImageUrl(meme.imageUrl);
            setLikes(meme.likes);
            setErrors({});
        }
    }, [meme]);

    const validate = (): boolean => {
        const newErrors: { name?: string; imageUrl?: string; likes?: string } = {};

        if (name.length < 3 || name.length > 100) {
            newErrors.name = "Name must be between 3 and 100 characters";
        }

        if (!imageUrl) {
            newErrors.imageUrl = "Image URL is required";
        } else if (!imageUrl.endsWith(".jpg") || !isValidUrl(imageUrl)) {
            newErrors.imageUrl = "Image URL must be a valid URL to a JPG image";
        }

        if (likes < 0 || likes > 99 || isNaN(Number(likes))) {
            newErrors.likes = "Likes must be a number between 0 and 99";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!meme || !validate()) return;

        try {
            const updatedMeme = await updateMeme({
                ...meme,
                name,
                imageUrl,
                likes: Number(likes),
            });

            onMemeUpdated(updatedMeme);
            onOpenChange(false);
        } catch (error) {
            console.error("Error updating meme:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Meme</ModalHeader>
                        <ModalBody>
                            <Input
                                errorMessage={errors.name}
                                isInvalid={!!errors.name}
                                label="Name"
                                placeholder="Meme name (3-100 characters)"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <Input
                                errorMessage={errors.imageUrl}
                                isInvalid={!!errors.imageUrl}
                                label="Image URL"
                                placeholder="Link to JPG image"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                            />
                            <Input
                                errorMessage={errors.likes}
                                isInvalid={!!errors.likes}
                                label="Likes"
                                max={99}
                                min={0}
                                placeholder="Number of likes (0-99)"
                                type="number"
                                value={likes.toString()}
                                onChange={e => setLikes(parseInt(e.target.value))}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                Save Changes
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

// Helper function to validate URL
function isValidUrl(url: string): boolean {
    try {
        new URL(url);

        return true;
    } catch {
        return false;
    }
}
