import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Become a Seller | Join the MSA Architect Network",
    description: "Monetize your code genius. Join our elite network of software architects and start selling your assets globally.",
};

export default function BecomeSellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
