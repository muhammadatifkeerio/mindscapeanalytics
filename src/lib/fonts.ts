import { Plus_Jakarta_Sans, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

export const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
});

export const ibmPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    variable: "--font-ibm-plex-sans",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export const fontVariables = `${plusJakartaSans.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`;
