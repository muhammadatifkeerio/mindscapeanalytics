"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Check, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "@/components/SmartImage";

interface ImageUploadProps {
    onUploadAction: (url: string) => void;
    initialUrl?: string;
}

export default function ImageUpload({ onUploadAction, initialUrl }: ImageUploadProps) {
    const [preview, setPreview] = useState<string>(initialUrl || "");
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const optimizeImage = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new window.Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // Standard Industrial Aspect Ratio (1200x800) for Marketplace
                    const TARGET_WIDTH = 1200;
                    const TARGET_HEIGHT = 800;

                    canvas.width = TARGET_WIDTH;
                    canvas.height = TARGET_HEIGHT;

                    if (ctx) {
                        // Center Crop / Cover logic
                        const scale = Math.max(TARGET_WIDTH / img.width, TARGET_HEIGHT / img.height);
                        const x = (TARGET_WIDTH / 2) - (img.width / 2) * scale;
                        const y = (TARGET_HEIGHT / 2) - (img.height / 2) * scale;

                        ctx.fillStyle = "black";
                        ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
                        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

                        // Iterative compression to get under 100KB
                        let quality = 0.8;
                        const attemptExport = () => {
                            canvas.toBlob(
                                (blob) => {
                                    if (blob) {
                                        if (blob.size > 100 * 1024 && quality > 0.1) {
                                            quality -= 0.1;
                                            attemptExport();
                                        } else {
                                            const reader = new FileReader();
                                            reader.readAsDataURL(blob);
                                            reader.onloadend = () => {
                                                resolve(reader.result as string);
                                            };
                                        }
                                    } else {
                                        reject(new Error("Blob creation failed"));
                                    }
                                },
                                "image/webp",
                                quality
                            );
                        };
                        attemptExport();
                    }
                };
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Invalid file type. Please upload an image.");
            return;
        }

        setError(null);
        setIsOptimizing(true);

        try {
            const optimizedDataUrl = await optimizeImage(file);
            setPreview(optimizedDataUrl);
            onUploadAction(optimizedDataUrl);
        } catch (err) {
            console.error("Optimization failed:", err);
            setError("Image optimization failed. Please try a different file.");
        } finally {
            setIsOptimizing(false);
        }
    };

    return (
        <div className="space-y-4">
            <div
                className={`relative aspect-video overflow-hidden rounded-2xl border-2 border-dashed bg-muted/40 transition-all sm:rounded-3xl ${isOptimizing ? "border-brand/40" : preview ? "border-transparent" : "cursor-pointer border-border hover:border-brand/50"
                    }`}
                onClick={() => !isOptimizing && fileInputRef.current?.click()}
            >
                {preview ? (
                    <>
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className={`object-cover transition-all duration-1000 ${isOptimizing ? "opacity-20 blur-sm" : "opacity-80"}`}
                        />
                        {!isOptimizing && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setPreview(""); onUploadAction(""); }}
                                type="button"
                                aria-label="Remove preview image"
                                className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-border bg-background/95 text-foreground shadow-sm transition-colors hover:bg-muted"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </>
                ) : (
                    <div className="flex cursor-pointer flex-col items-center gap-4 px-4 py-10 text-center sm:py-12">
                        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-background text-brand sm:h-16 sm:w-16 sm:rounded-[1.5rem]">
                            <Upload size={24} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-foreground">Choose a preview image</p>
                            <p className="mt-2 text-xs leading-5 text-muted-foreground">Optimized to WebP at 1200 × 800 for the shop.</p>
                        </div>
                    </div>
                )}

                {isOptimizing && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
                        <Loader2 className="mb-4 animate-spin text-brand" size={32} />
                        <span className="animate-pulse text-sm font-medium text-foreground">Optimizing image…</span>
                    </div>
                )}
            </div>

            {error && (
                <p role="alert" className="ml-2 text-sm font-medium text-destructive">{error}</p>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {!preview && !isOptimizing && (
                <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 px-3 py-3 sm:items-center sm:gap-4 sm:px-5 sm:py-4">
                    <ImageIcon size={16} className="mt-0.5 shrink-0 text-muted-foreground sm:mt-0" />
                    <p className="text-xs leading-5 text-muted-foreground">
                        Images are automatically optimized as WebP to keep product pages fast.
                    </p>
                </div>
            )}
        </div>
    );
}
