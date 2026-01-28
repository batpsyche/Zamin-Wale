import PopupEnquiry from "@/components/molecules/PopupEnquiry";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Open_Sans, Rubik } from "next/font/google";
import "./globals.css";
import Analytics from "@/provider/analytics";

const open_sans = Open_Sans({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-open-sans",
});

const rubik = Rubik({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-rubik",
});

export const metadata = {
    title: {
        template: "%s | Zaminwale",
        default: "Zaminwale – Buying and Selling of Land",
    },
    description: {
        template:
            "Zaminwale.com %s is India's leading online platform for buying and selling land. Find verified listings, trusted sellers, and the best real estate deals.",
        default:
            "Zaminwale.com is India's leading online platform for buying and selling land. Find verified listings, trusted sellers, and the best real estate deals.",
    },
    keywords: [
        "buy land",
        "sell land",
        "real estate",
        "land marketplace",
        "property for sale",
        "farmland",
        "commercial land",
        "residential plots",
        "Zaminwale",
    ],
    verification: {
        google: "e9G9-A11LLzgOrW4cFsc-2EuwHzF0TXMF_AwpRLn30Y",
    },
    openGraph: {
        title: "Zaminwale – Buying and Selling of Land",
        description:
            "Zaminwale.com is India's leading online platform for buying and selling land. Find verified listings, trusted sellers, and the best real estate deals.",
        siteName: "LetsUpgrade",
        images: [
            {
                url: "https://zaminwale-private.s3.ap-south-1.amazonaws.com/assets/property/images/f5eab6fc-6526-4a31-bfa3-2f1acc4ea435.png",
                width: 1200,
                height: 628,
                alt: "Zaminwale",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Zaminwale – Buying and Selling of Land",
        description:
            "Zaminwale.com is India's leading online platform for buying and selling land. Find verified listings, trusted sellers, and the best real estate deals.",
        images: [
            "https://zaminwale-private.s3.ap-south-1.amazonaws.com/assets/property/images/f5eab6fc-6526-4a31-bfa3-2f1acc4ea435.png",
        ],
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    minimalUI: true,
    // Also supported by less commonly used
    // interactiveWidget: 'resizes-visual',
};

export default function MainLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "h-screen flex flex-col font-rubik w-screen overflow-hidden ",
                    rubik.variable
                )}
            >
                <Analytics />
                <div className="flex relative w-full flex-1 flex-col">
                    {children}
                    <PopupEnquiry />
                </div>
                <Toaster richColors />
            </body>
        </html>
    );
}
