"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * SOURCE OF TRUTH KEYWORDS: WeChat contact, China phone, copy number, clipboard
 * WHAT: Lets visitors copy the published China office number for WeChat lookup.
 * WHY: No verified WeChat ID or QR is configured, so the phone number is the only reliable contact identifier.
 * WHERE: Contact cards and the global footer.
 */
export default function WechatNumber({ compact = false, locale = "en", inverse = false }: { compact?: boolean; locale?: "en" | "zh-CN"; inverse?: boolean }) {
    const [copied, setCopied] = useState(false);
    const isChinese = locale === "zh-CN";

    const copyNumber = async () => {
        try {
            await navigator.clipboard.writeText("+86 178 0226 7424");
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2200);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className={compact ? "flex flex-wrap items-center gap-x-3 gap-y-2" : "mt-4 flex flex-wrap items-center gap-x-3 gap-y-2"}>
            <a href="tel:+8617802267424" className={`font-semibold ${inverse ? "text-background" : "text-foreground"} underline-offset-4 hover:underline`}>+86 178 0226 7424</a>
            <button
                type="button"
                onClick={copyNumber}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-label={isChinese ? "复制手机号以在微信中搜索" : "Copy China phone number to search in WeChat"}
            >
                {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                {copied ? (isChinese ? "已复制号码" : "Number copied") : (isChinese ? "复制微信搜索号码" : "Copy for WeChat")}
            </button>
            <span className={`basis-full text-xs leading-5 ${inverse ? "text-background/70" : "text-muted-foreground"}`}>{isChinese ? "在微信中搜索此手机号添加联系；如无法复制，可长按号码手动复制。" : "Search this phone number in WeChat. If copy is unavailable, select the number to copy it."}</span>
        </div>
    );
}
