import { Metadata } from "next";
import BlockchainClient from "./BlockchainClient";

export const metadata: Metadata = {
    title: "Blockchain & Web3 Architectures | Mindscape Analytics",
    description: "Architecting decentralized trust systems, secure smart contracts, and Web3 infrastructure that redefine transparency and digital ownership.",
    openGraph: {
        title: "Blockchain & Web3 Architectures | Mindscape Analytics",
        description: "Architecting decentralized trust systems, secure smart contracts, and Web3 infrastructure that redefine transparency and digital ownership.",
        url: "https://mindscapeanalytics.com/solutions/blockchain",
        siteName: "Mindscape Analytics",
        locale: "en_US",
        type: "website",
    },
};

export default function BlockchainPage() {
    return <BlockchainClient />;
}
