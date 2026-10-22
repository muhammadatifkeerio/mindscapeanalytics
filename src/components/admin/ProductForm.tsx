"use client";

import React from "react";
import {
    Package,
    Type,
    DollarSign,
    FileText,
    Tag,
    Image as ImageIcon,
    Save,
    Plus,
    X,
    Cpu,
    Check,
    Loader2
} from "lucide-react";
import ImageUpload from "@/components/shop/ImageUpload";

import type { ActionState, ProductFormInitial } from "@/lib/types";
import { asStringList } from "@/lib/json-list";

interface ProductFormProps {
    action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
    submitLabel?: string;
    initialData?: ProductFormInitial;
}

const CATEGORIES = [
    { id: "web_projects", name: "Web Projects" },
    { id: "saas", name: "SaaS Templates" },
    { id: "ai_agents", name: "AI Agents" },
    { id: "workflows", name: "Workflows" },
    { id: "excel_dashboards", name: "Excel Dashboards" },
    { id: "powerbi_dashboards", name: "PowerBI Dashboards" },
    { id: "data_viz", name: "Tableau / Looker / Dashboards" },
    { id: "ideas_templates", name: "Ideas & Templates" },
    { id: "ui_ux", name: "UI/UX Kits" },
    { id: "management_systems", name: "Management Systems" },
];

export default function ProductForm({ action, submitLabel = "Execute Deployment", initialData }: ProductFormProps) {
    const [state, formAction, isPending] = React.useActionState(action, { error: null, success: false });
    const [techStack, setTechStack] = React.useState<string[]>(asStringList(initialData?.techStack));
    const [features, setFeatures] = React.useState<string[]>(asStringList(initialData?.features));
    const [imageUrl, setImageUrl] = React.useState<string>(initialData?.images?.[0]?.url || "");
    const [productFiles, setProductFiles] = React.useState<Array<{ filename: string; url: string }>>(
        initialData?.productFiles || [{ filename: "", url: "" }]
    );

    const addFile = () => setProductFiles([...productFiles, { filename: "", url: "" }]);
    const removeFile = (index: number) => {
        if (productFiles.length > 1) {
            setProductFiles(productFiles.filter((_, i) => i !== index));
        } else {
            setProductFiles([{ filename: "", url: "" }]);
        }
    };
    const updateFile = (index: number, field: "filename" | "url", value: string) => {
        const newFiles = [...productFiles];
        newFiles[index][field] = value;
        setProductFiles(newFiles);
    };

    const addTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = e.currentTarget.value.trim();
            if (val && !techStack.includes(val)) {
                setTechStack([...techStack, val]);
                e.currentTarget.value = '';
            }
        }
    };

    const addFeature = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = e.currentTarget.value.trim();
            if (val && !features.includes(val)) {
                setFeatures([...features, val]);
                e.currentTarget.value = '';
            }
        }
    };

    const handleSubmit = (formData: FormData) => {
        techStack.forEach(t => formData.append('techStack', t));
        features.forEach(f => formData.append('features', f));

        if (imageUrl.trim() !== "") {
            formData.append('imageUrl', imageUrl);
        }

        productFiles.filter(f => f.url.trim() !== "").forEach(f => {
            formData.append('fileUrl', f.url);
            formData.append('fileName', f.filename || "Digital_Asset");
        });

        if (initialData?.id && !formData.has("id")) {
            formData.append("id", initialData.id);
        }

        formAction(formData);
    };

    return (
        <form
            action={handleSubmit}
            className="space-y-6 sm:space-y-8"
        >
            {state?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center animate-shake">
                    {state.error}
                </div>
            )}

            {/* Core Metadata */}
            <div className="space-y-6 rounded-2xl border border-border bg-card p-4 sm:space-y-8 sm:p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-2">
                    <Package size={18} className="text-brand" />
                    <h3 className="text-sm font-semibold text-foreground">Product details</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-foreground">Product name</label>
                        <div className="relative group">
                            <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground" size={16} />
                            <input
                                type="text"
                                name="name"
                                defaultValue={initialData?.name}
                                required
                                placeholder="E.G. NEURAL_CORE_V1"
                                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-medium text-foreground">Price (USD)</label>
                        <div className="relative group">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground" size={16} />
                            <input
                                type="number"
                                name="price"
                                defaultValue={initialData?.price}
                                required
                                min="0"
                                step="1"
                                placeholder="0"
                                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                        <label className="text-sm font-medium text-foreground">Category</label>
                    <div className="relative group">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground" size={16} />
                        <select
                            name="category"
                            defaultValue={initialData?.category || "saas"}
                            className="w-full appearance-none rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        >
                            {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <div className="relative group">
                        <FileText className="absolute left-4 top-5 text-muted-foreground transition-colors group-focus-within:text-foreground" size={16} />
                        <textarea
                            name="description"
                            defaultValue={initialData?.description ?? undefined}
                            required
                            rows={4}
                            placeholder="Identify the core primitives and intended utility..."
                            className="w-full rounded-xl border border-border bg-background py-4 pl-12 pr-4 text-base leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                    </div>
                </div>
            </div>

            {/* Technical Configuration */}
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                {/* Tech Stack */}
                <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <Cpu size={18} className="text-brand" />
                        <h3 className="text-sm font-semibold text-foreground">Technology stack</h3>
                    </div>
                    <div className="space-y-6">
                        <input
                            type="text"
                            placeholder="Add tech (ENTER)"
                            onKeyDown={addTech}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                        <div className="flex flex-wrap gap-2">
                            {techStack.map(t => (
                                <span key={t} className="px-3 py-1.5 bg-foreground text-background text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2">
                                    {t}
                                    <button type="button" onClick={() => setTechStack(techStack.filter(x => x !== t))}><X size={10} /></button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <Check size={18} className="text-brand" />
                        <h3 className="text-sm font-semibold text-foreground">Features</h3>
                    </div>
                    <div className="space-y-6">
                        <input
                            type="text"
                            placeholder="Add feature (ENTER)"
                            onKeyDown={addFeature}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                        <div className="flex flex-wrap gap-2">
                            {features.map(f => (
                                <span key={f} className="px-3 py-1.5 bg-foreground/5 border border-border text-foreground text-[9px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-2">
                                    {f}
                                    <button type="button" onClick={() => setFeatures(features.filter(x => x !== f))}><X size={10} /></button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 sm:rounded-3xl sm:p-6 lg:p-8">
                <div className="mb-5 flex items-center gap-3 sm:mb-8 sm:gap-4">
                    <ImageIcon size={18} className="text-brand" />
                    <h3 className="text-sm font-semibold text-foreground">Preview image</h3>
                </div>
                <div className="space-y-6">
                    <ImageUpload
                        onUploadAction={setImageUrl}
                        initialUrl={imageUrl}
                    />
                    <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-3 sm:items-center sm:gap-4 sm:p-4">
                        <Check size={16} className="mt-0.5 shrink-0 text-muted-foreground sm:mt-0" />
                        <p className="text-xs leading-5 text-muted-foreground">
                            Requirement: One high-fidelity preview image at 1200x800 industrial aspect ratio. 100KB WebP optimization is automatic.
                        </p>
                    </div>
                </div>
            </div>

            {/* Asset Deliverables */}
            <div className="rounded-2xl border border-border bg-card p-4 sm:rounded-3xl sm:p-6 lg:p-8">
                <div className="mb-5 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Save size={18} className="text-brand" />
                        <h3 className="text-sm font-semibold text-foreground">Digital files</h3>
                    </div>
                    <button
                        type="button"
                        onClick={addFile}
                        className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70"
                    >
                        <Plus size={12} />
                        Add Package
                    </button>
                </div>
                <div className="space-y-6">
                    {productFiles.map((file, index) => (
                        <div key={index} className="relative space-y-4 rounded-xl border border-border bg-background p-3 sm:rounded-2xl sm:p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="ml-1 text-xs font-medium text-muted-foreground">Package name</label>
                                    <input
                                        type="text"
                                        value={file.filename}
                                        onChange={(e) => updateFile(index, "filename", e.target.value)}
                                        placeholder="E.G. CORE_REPOSITORY_V1"
                                        className="min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 sm:px-4"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="ml-1 text-xs font-medium text-muted-foreground">Secure download URL</label>
                                    <input
                                        type="url"
                                        value={file.url}
                                        onChange={(e) => updateFile(index, "url", e.target.value)}
                                        placeholder="HTTPS://GITHUB.COM/MSA/REPOSITORY"
                                        className="min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 sm:px-4"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                aria-label={`Remove package ${index + 1}`}
                                className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive sm:right-3 sm:top-3"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                    <p className="ml-1 text-xs leading-5 text-muted-foreground">Download links are shared with verified purchasers after payment is complete.</p>
                </div>
            </div>

            {/* Deployment Action */}
            <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check size={16} className="text-brand" />
                    <span>Form validation is active</span>
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lg transition-opacity hover:opacity-90 active:scale-[.99] disabled:opacity-50 sm:w-auto sm:px-8"
                >
                    {isPending ? "INITIALIZING DEPLOYMENT..." : submitLabel}
                    <Plus size={14} />
                </button>
            </div>
        </form >
    );
}
