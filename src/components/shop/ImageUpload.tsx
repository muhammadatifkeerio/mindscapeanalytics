"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Check, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

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
                className={`relative aspect-video rounded-[2rem] border-2 border-dashed transition-all overflow-hidden flex items-center justify-center bg-foreground/[0.02] ${isOptimizing ? "border-foreground/20" : preview ? "border-transparent" : "border-border hover:border-foreground/20 cursor-pointer"
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
                                className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-xl border border-border rounded-full text-foreground/40 hover:text-foreground transition-all shadow-2xl"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-4 py-12">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-foreground/5 border border-border flex items-center justify-center text-foreground/20">
                            <Upload size={24} />
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">Select Visual Artifact</p>
                            <p className="text-[8px] text-foreground/10 uppercase tracking-widest mt-2">Standard: high-fidelity 1200x800 webp</p>
                        </div>
                    </div>
                )}

                {isOptimizing && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md">
                        <Loader2 className="text-foreground/40 animate-spin mb-4" size={32} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/60 animate-pulse">Optimizing Asset...</span>
                    </div>
                )}
            </div>

            {error && (
                <p className="text-[9px] font-black uppercase tracking-widest text-red-500/60 ml-2">{error}</p>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {!preview && !isOptimizing && (
                <div className="flex items-center gap-4 px-6 py-4 bg-foreground/[0.02] border border-border rounded-2xl">
                    <ImageIcon size={16} className="text-foreground/20" />
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-foreground/20 leading-loose">
                        Platform Policy: Automatic 100KB WebP optimization enforced for maximum system throughput.
                    </p>
                </div>
            )}
        </div>
    );
}
