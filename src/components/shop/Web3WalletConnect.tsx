"use client";

import React, { useState, useEffect } from "react";
import { Wallet, Check, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Add global types directly for window injection checking
declare global {
    interface Window {
        ethereum?: any;
        solana?: any;
    }
}

export default function Web3WalletConnect() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [walletType, setWalletType] = useState<"ETH" | "SOL" | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Check saved state on load
    useEffect(() => {
        const savedAddress = localStorage.getItem("msa_wallet_address");
        const savedType = localStorage.getItem("msa_wallet_type") as "ETH" | "SOL" | null;
        if (savedAddress && savedType) {
            setWalletAddress(savedAddress);
            setWalletType(savedType);
        }
    }, []);

    const connectEthereum = async () => {
        setIsConnecting(true);
        setError(null);
        try {
            if (typeof window.ethereum === "undefined") {
                throw new Error("Ethereum wallet (e.g., MetaMask) not detected. Please install the extension.");
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length > 0) {
                const address = accounts[0];
                setWalletAddress(address);
                setWalletType("ETH");
                localStorage.setItem("msa_wallet_address", address);
                localStorage.setItem("msa_wallet_type", "ETH");
                setIsOpen(false);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to connect to Ethereum Network.");
        } finally {
            setIsConnecting(false);
        }
    };

    const connectSolana = async () => {
        setIsConnecting(true);
        setError(null);
        try {
            if (typeof window.solana === "undefined" || !window.solana.isPhantom) {
                throw new Error("Phantom wallet not detected. Please install the Phantom extension.");
            }
            const resp = await window.solana.connect();
            const address = resp.publicKey.toString();
            setWalletAddress(address);
            setWalletType("SOL");
            localStorage.setItem("msa_wallet_address", address);
            localStorage.setItem("msa_wallet_type", "SOL");
            setIsOpen(false);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to connect to Solana Network.");
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setWalletAddress(null);
        setWalletType(null);
        localStorage.removeItem("msa_wallet_address");
        localStorage.removeItem("msa_wallet_type");
        setIsOpen(false);
        if (walletType === "SOL" && window.solana && window.solana.disconnect) {
            try { window.solana.disconnect(); } catch (e) { }
        }
    };

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-border rounded-xl hover:bg-foreground/10 hover:border-foreground/20 transition-all font-mono text-[10px] uppercase font-black tracking-widest text-foreground/80"
            >
                <Wallet className="w-4 h-4 text-foreground/60" />
                {walletAddress ? (
                    <span className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${walletType === 'ETH' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                        {formatAddress(walletAddress)}
                    </span>
                ) : (
                    "Connect Wallet"
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-3 w-80 bg-foreground/5/95 backdrop-blur-3xl border border-border rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
                        >
                            <div className="p-4 border-b border-border flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/60">Wallet Integration</span>
                                <span className="text-[8px] font-mono text-foreground/20 uppercase tracking-widest">Web3_Link</span>
                            </div>

                            <div className="p-4 space-y-4">
                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                        <p className="text-[9px] uppercase tracking-widest leading-relaxed font-bold">{error}</p>
                                    </div>
                                )}

                                {!walletAddress ? (
                                    <>
                                        <button
                                            onClick={connectEthereum}
                                            disabled={isConnecting}
                                            className="w-full flex items-center justify-between p-4 bg-foreground/[0.03] border border-border rounded-xl hover:bg-foreground/[0.08] transition-all group disabled:opacity-50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                    <span className="w-3 h-3 bg-blue-500 rounded-full group-hover:scale-125 transition-transform" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-[11px] font-black uppercase tracking-widest text-foreground">Ethereum (ETH)</div>
                                                    <div className="text-[9px] font-medium uppercase tracking-widest text-foreground/40">MetaMask / ERC-20</div>
                                                </div>
                                            </div>
                                            {isConnecting && !error ? <RefreshCw className="w-4 h-4 animate-spin text-foreground/40" /> : null}
                                        </button>

                                        <button
                                            onClick={connectSolana}
                                            disabled={isConnecting}
                                            className="w-full flex items-center justify-between p-4 bg-foreground/[0.03] border border-border rounded-xl hover:bg-foreground/[0.08] transition-all group disabled:opacity-50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                                    <span className="w-3 h-3 bg-purple-500 rounded-full group-hover:scale-125 transition-transform" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-[11px] font-black uppercase tracking-widest text-foreground">Solana (SOL)</div>
                                                    <div className="text-[9px] font-medium uppercase tracking-widest text-foreground/40">Phantom / SPL</div>
                                                </div>
                                            </div>
                                            {isConnecting && !error ? <RefreshCw className="w-4 h-4 animate-spin text-foreground/40" /> : null}
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-foreground/5 border border-border rounded-xl space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Network</span>
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${walletType === 'ETH' ? 'text-blue-400' : 'text-purple-400'}`}>
                                                    {walletType === 'ETH' ? 'Ethereum' : 'Solana'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Address</span>
                                                <span className="text-[11px] font-mono text-foreground tracking-widest">{formatAddress(walletAddress)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 pt-2 text-[9px] font-black uppercase tracking-widest text-green-400">
                                                <Check className="w-3 h-3" />
                                                Authenticated
                                            </div>
                                        </div>

                                        <button
                                            onClick={disconnectWallet}
                                            className="w-full py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                        >
                                            Disconnect Identity
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
